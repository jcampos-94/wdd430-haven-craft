'use client';

import React, { useEffect, useMemo, useState } from 'react';
import pageStyles from '../page.module.css';
import styles from './Checkout.module.css';
import { useLocalCart, CartItem } from '../hooks/useLocalCart';

/* ====================== Utils (compact) ======================= */
const formatUSD = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
const onlyDigits = (s: string) => s.replace(/\D+/g, '');
const lettersOnly = (s: string) => s.replace(/[^A-Za-zÀ-ÿ' -]/g, '');
const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
const phoneOk = (s: string) => /^\d{7,11}$/.test(onlyDigits(s));

const DIGITS_5 = /^\d{5}$/;
const POSTAL_RULES: Record<
  string,
  { len: number; regex: RegExp; msg: string }
> = {
  'United States': {
    len: 5,
    regex: DIGITS_5,
    msg: 'Postal code must be 5 digits',
  },
  Mexico: { len: 5, regex: DIGITS_5, msg: 'Postal code must be 5 digits' },
  Guatemala: { len: 5, regex: DIGITS_5, msg: 'Postal code must be 5 digits' },
  Peru: { len: 5, regex: DIGITS_5, msg: 'Postal code must be 5 digits' },
};
const postalOkByCountry = (raw: string, country: string) =>
  (POSTAL_RULES[country] ?? POSTAL_RULES['United States']).regex.test(
    onlyDigits(raw)
  );

function luhnCheck(num: string) {
  const arr = onlyDigits(num).split('').reverse().map(Number);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let n = arr[i];
    if (i % 2) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return sum % 10 === 0;
}
type CardBrand = 'amex' | 'visa' | 'mc' | 'other' | null;
const detectBrand = (num: string): CardBrand => {
  const n = onlyDigits(num);
  if (/^3[47]\d{0,13}$/.test(n)) return 'amex';
  if (/^4\d{0,15}$/.test(n)) return 'visa';
  if (
    /^(5[1-5]\d{0,14}|2(2[2-9]\d{0,12}|[3-6]\d{0,13}|7[01]\d{0,12}|720\d{0,11}))$/.test(
      n
    )
  )
    return 'mc';
  return n.length ? 'other' : null;
};
const cardOk = (num: string) => {
  const d = onlyDigits(num);
  const b = detectBrand(num);
  const lenOk = b === 'amex' ? d.length === 15 : d.length === 16;
  return lenOk && luhnCheck(d);
};
const cvcOk = (cvc: string, brand: CardBrand) =>
  brand === 'amex'
    ? /^\d{4}$/.test(onlyDigits(cvc))
    : /^\d{3}$/.test(onlyDigits(cvc));
const expiryOk = (exp: string) => {
  if (!/^(\d{2})\/(\d{2})$/.test(exp)) return false;
  const [mm, yy] = exp.split('/').map(Number);
  if (mm < 1 || mm > 12) return false;
  const endOfMonth = new Date(2000 + yy, mm, 0, 23, 59, 59, 999);
  return endOfMonth >= new Date();
};

/* ====================== Types & Constants ===================== */
type ShipOption = {
  id: 'standard' | 'expedited' | 'priority';
  name: string;
  desc: string;
  price: number;
};
const SHIP_OPTIONS: ShipOption[] = [
  { id: 'standard', name: 'Standard', desc: '4–6 business days', price: 6 },
  { id: 'expedited', name: 'Expedited', desc: '2–3 business days', price: 12 },
  { id: 'priority', name: 'Priority', desc: '1–2 business days', price: 22 },
];

type FormData = {
  email: string;
  postal: string;
  phone: string;
  first: string;
  last: string;
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  country: string;
  card: string;
  cvc: string;
  exp: string;
  save: boolean;
};
type Errors = Partial<Record<keyof FormData, string>>;

const inputBase =
  'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600';
const labelBase = 'text-sm font-semibold text-slate-900';

/* ====================== Small Input component ================= */
type FieldProps = {
  id: keyof FormData;
  label: string;
  value: string | number | boolean;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
  maxLength?: number;
  error?: string;
};
function InputField({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  inputMode,
  autoComplete,
  maxLength,
  error,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={String(id)} className={labelBase}>
        {label}
      </label>
      <input
        id={String(id)}
        type={type}
        className={`${inputBase} ${error ? 'border-red-500' : ''}`}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={`${id}-err`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/* ============================ Page ============================ */
export default function CheckoutPage() {
  const { items, subtotal, clear } = useLocalCart();
  const [ship, setShip] = useState<ShipOption>(SHIP_OPTIONS[0]);
  const [coupon, setCoupon] = useState('');
  const couponTrim = coupon.trim().toUpperCase();
  const couponDiscount = useMemo(
    () =>
      couponTrim === 'HAVEN10' ? Math.round(subtotal * 0.1 * 100) / 100 : 0,
    [couponTrim, subtotal]
  );

  const [f, setF] = useState<FormData>({
    email: '',
    postal: '',
    phone: '',
    first: '',
    last: '',
    addr1: '',
    addr2: '',
    city: '',
    state: '',
    country: 'United States',
    card: '',
    cvc: '',
    exp: '',
    save: false,
  });
  const [err, setErr] = useState<Errors>({});
  const brand = detectBrand(f.card);
  const postalRule = useMemo(
    () => POSTAL_RULES[f.country] ?? POSTAL_RULES['United States'],
    [f.country]
  );

  const setField = (k: keyof FormData, v: string | boolean) =>
    setF((s) => ({ ...s, [k]: v }));

  // Sanitize/format onChange
  const onPhone = (v: string) => setField('phone', onlyDigits(v).slice(0, 11));
  const onFirst = (v: string) => setField('first', lettersOnly(v));
  const onLast = (v: string) => setField('last', lettersOnly(v));
  const onCity = (v: string) => setField('city', lettersOnly(v));
  const onState = (v: string) => setField('state', lettersOnly(v));
  const onPostal = (v: string) =>
    setField('postal', onlyDigits(v).slice(0, postalRule.len));
  const onCard = (v: string) => {
    const d = onlyDigits(v);
    const am = detectBrand(d) === 'amex';
    const cut = d.slice(0, am ? 15 : 16);
    const parts = am
      ? [cut.slice(0, 4), cut.slice(4, 10), cut.slice(10, 15)]
      : [cut.slice(0, 4), cut.slice(4, 8), cut.slice(8, 12), cut.slice(12, 16)];
    setField('card', parts.filter(Boolean).join(' '));
  };
  const onExp = (v: string) => {
    const d = onlyDigits(v).slice(0, 4);
    setField('exp', d.length <= 2 ? d : d.slice(0, 2) + '/' + d.slice(2));
  };
  const onCvc = (v: string) =>
    setField('cvc', onlyDigits(v).slice(0, brand === 'amex' ? 4 : 3));

  // Validators (EN)
  const vEmail = () =>
    setErr((e) => ({ ...e, email: emailOk(f.email) ? '' : 'Invalid email' }));
  const vPostal = () =>
    setErr((e) => ({
      ...e,
      postal: postalOkByCountry(f.postal, f.country) ? '' : postalRule.msg,
    }));
  const vPhone = () =>
    setErr((e) => ({
      ...e,
      phone: phoneOk(f.phone) ? '' : 'Invalid phone number',
    }));
  const req = (k: keyof FormData) =>
    setErr((e) => ({ ...e, [k]: String(f[k]).trim() ? '' : 'Required' }));
  const vCard = () =>
    setErr((e) => ({
      ...e,
      card: cardOk(f.card)
        ? ''
        : onlyDigits(f.card).length < (brand === 'amex' ? 15 : 16)
        ? 'Card number incomplete'
        : 'Invalid card number',
    }));
  const vCvc = () =>
    setErr((e) => ({
      ...e,
      cvc: cvcOk(f.cvc, brand)
        ? ''
        : brand === 'amex'
        ? 'CVC must be 4 digits'
        : 'CVC must be 3 digits',
    }));
  const vExp = () =>
    setErr((e) => ({
      ...e,
      exp: expiryOk(f.exp) ? '' : 'Invalid expiry date',
    }));

  const shipping = items.length ? ship.price : 0;
  const total = Math.max(0, subtotal - couponDiscount) + shipping;

  const allValid =
    items.length > 0 &&
    emailOk(f.email) &&
    postalOkByCountry(f.postal, f.country) &&
    phoneOk(f.phone) &&
    f.first.trim() &&
    f.last.trim() &&
    f.addr1.trim() &&
    f.city.trim() &&
    f.state.trim() &&
    cardOk(f.card) &&
    cvcOk(f.cvc, brand) &&
    expiryOk(f.exp);

  const [paid, setPaid] = useState(false);
  useEffect(() => {
    if (paid) {
      const t = setTimeout(() => setPaid(false), 4000);
      return () => clearTimeout(t);
    }
  }, [paid]);

  const onPay = () => {
    if (!allValid) return;
    setPaid(true);
    setF({
      email: '',
      postal: '',
      phone: '',
      first: '',
      last: '',
      addr1: '',
      addr2: '',
      city: '',
      state: '',
      country: 'United States',
      card: '',
      cvc: '',
      exp: '',
      save: false,
    });
    setErr({});
    setCoupon('');
    clear?.();
  };

  const onCountryChange = (next: string) => {
    setField('country', next);
    const nextLen = (POSTAL_RULES[next] ?? POSTAL_RULES['United States']).len;
    const trimmed = onlyDigits(f.postal).slice(0, nextLen);
    setField('postal', trimmed);
    setTimeout(
      () =>
        setErr((e) => ({
          ...e,
          postal: postalOkByCountry(trimmed, next) ? '' : '',
        })),
      0
    );
  };

  return (
    <main className={pageStyles.main}>
      <div className={styles.shell}>
        <header className={styles.head}>
          <h1 className={styles.title}>Checkout</h1>
          <ol className={styles.stepper}>
            <li className={styles.stepActive}>
              <span className={styles.stepBadgeFilled}>1</span>
              <span>Cart</span>
              <span className={styles.dot}>&nbsp;•</span>
            </li>
            <li className={styles.stepCurrent}>
              <span className={styles.stepBadgeOutlined}>2</span>
              <span>Checkout</span>
              <span className={styles.dot}>&nbsp;•</span>
            </li>
            <li className={styles.stepIdle}>
              <span className={styles.stepBadgeIdle}>3</span>
              <span>Confirmation</span>
            </li>
          </ol>
        </header>
      </div>

      <div className={styles.shell}>
        <div className={styles.grid}>
          {/* Left */}
          <section className={styles.dominant}>
            <div className={styles.inner}>
              <div className={styles.subcard}>
                <h2 className={styles.h2}>Shipping address</h2>

                <div className={styles.formGrid}>
                  <div className={styles.span2}>
                    <InputField
                      id="email"
                      label="Email"
                      value={f.email}
                      onChange={(v) => setField('email', v)}
                      onBlur={vEmail}
                      type="email"
                      autoComplete="email"
                      error={err.email}
                    />
                  </div>

                  <InputField
                    id="postal"
                    label="Postal code"
                    value={f.postal}
                    onChange={onPostal}
                    onBlur={vPostal}
                    inputMode="numeric"
                    maxLength={postalRule.len}
                    error={err.postal}
                  />
                  <InputField
                    id="phone"
                    label="Phone number"
                    value={f.phone}
                    onChange={onPhone}
                    onBlur={vPhone}
                    inputMode="numeric"
                    maxLength={11}
                    error={err.phone}
                  />

                  <InputField
                    id="first"
                    label="First name"
                    value={f.first}
                    onChange={onFirst}
                    onBlur={() => req('first')}
                    error={err.first}
                  />
                  <InputField
                    id="last"
                    label="Last name"
                    value={f.last}
                    onChange={onLast}
                    onBlur={() => req('last')}
                    error={err.last}
                  />

                  <div className={styles.span2}>
                    <InputField
                      id="addr1"
                      label="Address line 1"
                      value={f.addr1}
                      onChange={(v) => setField('addr1', v)}
                      onBlur={() => req('addr1')}
                      autoComplete="address-line1"
                      error={err.addr1}
                    />
                  </div>
                  <div className={styles.span2}>
                    <InputField
                      id="addr2"
                      label="Address line 2 (optional)"
                      value={f.addr2}
                      onChange={(v) => setField('addr2', v)}
                      autoComplete="address-line2"
                    />
                  </div>

                  <InputField
                    id="city"
                    label="City"
                    value={f.city}
                    onChange={onCity}
                    onBlur={() => req('city')}
                    error={err.city}
                  />
                  <InputField
                    id="state"
                    label="State / Province"
                    value={f.state}
                    onChange={onState}
                    onBlur={() => req('state')}
                    error={err.state}
                  />

                  <div className={styles.span2}>
                    <label htmlFor="country" className={labelBase}>
                      Country
                    </label>
                    <select
                      id="country"
                      className={inputBase}
                      value={f.country}
                      onChange={(e) => onCountryChange(e.target.value)}
                    >
                      <option>United States</option>
                      <option>Mexico</option>
                      <option>Guatemala</option>
                      <option>Peru</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.subcard}>
                <h2 className={styles.h2}>Shipping Method</h2>
                <div
                  className={styles.shipGrid}
                  role="radiogroup"
                  aria-label="Shipping method"
                >
                  {SHIP_OPTIONS.map((opt) => {
                    const active = opt.id === ship.id;
                    return (
                      <label
                        key={opt.id}
                        className={`${styles.shipOption} ${
                          active ? styles.shipOptionActive : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="ship"
                          className="peer sr-only"
                          checked={active}
                          onChange={() => setShip(opt)}
                          aria-checked={active}
                          aria-label={opt.name}
                        />
                        <span className="grid place-content-center h-5 w-5 rounded-full border-2 border-emerald-600 ring-0 transition peer-checked:bg-emerald-600 peer-checked:ring-2 peer-checked:ring-emerald-600/30" />
                        <div className={styles.shipText}>
                          <span className={styles.shipName}>{opt.name}</span>
                          <span className={styles.shipDesc}>
                            {opt.desc} · <strong>{formatUSD(opt.price)}</strong>
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Right */}
          <section className={styles.dominant}>
            <div className={styles.inner}>
              <div className={styles.subcard}>
                <h2 className={styles.h2}>Order Summary</h2>
                <ul className={styles.itemsList}>
                  {items.length === 0 && (
                    <li className={styles.empty}>Your cart is empty.</li>
                  )}
                  {items.map((it: CartItem, i: number) => (
                    <li key={i} className={styles.itemRow}>
                      <span className={styles.itemName}>
                        {it.name}{' '}
                        <span className={styles.itemQty}>× {it.qty ?? 1}</span>
                      </span>
                      <span className={styles.itemPrice}>
                        {formatUSD(it.price * (it.qty ?? 1))}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className={styles.hr} />
                <dl className={styles.totals}>
                  <div className={styles.totalRow}>
                    <dt>Subtotal</dt>
                    <dd>{formatUSD(subtotal)}</dd>
                  </div>
                  <div className={styles.totalRow}>
                    <dt>Shipping ({ship.name})</dt>
                    <dd>{formatUSD(items.length ? ship.price : 0)}</dd>
                  </div>
                  {couponDiscount > 0 && (
                    <div className={`${styles.totalRow} ${styles.discountRow}`}>
                      <dt>Discount (HAVEN10)</dt>
                      <dd>−{formatUSD(couponDiscount)}</dd>
                    </div>
                  )}
                  <div className={`${styles.totalRow} ${styles.totalStrong}`}>
                    <dt>Total</dt>
                    <dd>
                      {formatUSD(
                        Math.max(0, subtotal - couponDiscount) +
                          (items.length ? ship.price : 0)
                      )}
                    </dd>
                  </div>
                </dl>

                <div className={styles.couponRow}>
                  <input
                    type="text"
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Promo code (e.g., HAVEN10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    aria-label="Promo code"
                  />
                  <button
                    type="button"
                    onClick={() => couponTrim && setCoupon(couponTrim)}
                    disabled={!couponTrim}
                    aria-disabled={!couponTrim}
                    className={`${styles.btnOutline} ${
                      !couponTrim ? styles.btnDisabled : ''
                    }`}
                    title={
                      !couponTrim ? 'Enter a promo code' : 'Apply promo code'
                    }
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className={styles.subcard}>
                <h2 className={styles.h2}>Payment Method</h2>
                <div className={styles.formCol}>
                  <div>
                    <label htmlFor="card" className={labelBase}>
                      Card number{' '}
                      {brand ? (
                        <span className="ml-1 text-slate-500 text-xs">
                          ({brand.toUpperCase()})
                        </span>
                      ) : null}
                    </label>
                    <input
                      id="card"
                      inputMode="numeric"
                      className={`${inputBase} ${
                        err.card ? 'border-red-500' : ''
                      }`}
                      placeholder="4242 4242 4242 4242"
                      value={f.card}
                      onChange={(e) => onCard(e.target.value)}
                      onBlur={vCard}
                      aria-invalid={!!err.card}
                      aria-describedby="card-err"
                      maxLength={brand === 'amex' ? 17 : 19}
                    />
                    {err.card && (
                      <p id="card-err" className="mt-1 text-sm text-red-600">
                        {err.card}
                      </p>
                    )}
                  </div>

                  <div className={styles.form2Cols}>
                    <InputField
                      id="cvc"
                      label="CVC"
                      value={f.cvc}
                      onChange={onCvc}
                      onBlur={vCvc}
                      inputMode="numeric"
                      maxLength={brand === 'amex' ? 4 : 3}
                      placeholder={brand === 'amex' ? '1234' : '123'}
                      error={err.cvc}
                    />
                    <InputField
                      id="exp"
                      label="Expiry (MM/YY)"
                      value={f.exp}
                      onChange={onExp}
                      onBlur={vExp}
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="12/34"
                      error={err.exp}
                    />
                  </div>

                  <label className={styles.saveRow}>
                    <input
                      id="save"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                      checked={f.save}
                      onChange={(e) => setField('save', e.target.checked)}
                    />
                    <span>Save card</span>
                  </label>

                  <button
                    type="button"
                    disabled={!allValid}
                    aria-disabled={!allValid}
                    onClick={onPay}
                    className={`${styles.btnPrimary} ${
                      !allValid ? styles.btnDisabled : ''
                    }`}
                  >
                    {items.length ? `PAY ${formatUSD(total)}` : 'Cart is empty'}
                  </button>

                  {paid && (
                    <div
                      role="status"
                      className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900"
                    >
                      ✅ Payment successful. Thank you!
                    </div>
                  )}

                  <p className="mt-2 text-xs text-slate-500">
                    Test cards: VISA 4242 4242 4242 4242 · AMEX 3782 822463
                    10005
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
