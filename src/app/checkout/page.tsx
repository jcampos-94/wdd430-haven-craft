'use client';

import React from 'react';
import { useLocalCart, CartItem } from '../hooks/useLocalCart';

function formatUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function Checkout() {
  // styles
  const input =
    'mt-1 block w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600';
  const label = 'text-sm font-medium text-slate-700';
  const radio = 'h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-slate-300';
  const panel = 'rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden';

  // cart localStorage
  const { items, subtotal } = useLocalCart();
  const shipping = items.length ? 6 : 0; 
  const total = subtotal + shipping;

  return (
    <main className="w-full flex justify-center bg-transparent px-4 sm:px-6 py-4">
      <div className="mx-auto w-full max-w-screen-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-6 sm:p-10 lg:p-12">
        <h1 className="mb-8 text-center text-3xl md:text-4xl font-bold text-emerald-900">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Lado Izq. */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            <section className={panel}>
              {/* Spaciado */}
              <div className="px-8 md:px-12 py-6 md:py-8">
                <h2 className="mb-6 text-xl font-semibold text-slate-800">Shipping address</h2>

                <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-6">
                  <div className="md:col-span-2">
                    <label htmlFor="email" className={label}>Email</label>
                    <input id="email" type="email" className={input} />
                  </div>

                  <div>
                    <label htmlFor="postal" className={label}>Postal code</label>
                    <input id="postal" type="text" className={input} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone number</label>
                    <input id="phone" type="tel" className={input} />
                  </div>

                  <div>
                    <label htmlFor="first" className={label}>First name</label>
                    <input id="first" type="text" className={input} />
                  </div>
                  <div>
                    <label htmlFor="last" className={label}>Last name</label>
                    <input id="last" type="text" className={input} />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="addr1" className={label}>Address line 1</label>
                    <input id="addr1" type="text" className={input} />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="addr2" className={label}>Address line 2 (optional)</label>
                    <input id="addr2" type="text" className={input} />
                  </div>

                  <div>
                    <label htmlFor="city" className={label}>City</label>
                    <input id="city" type="text" className={input} />
                  </div>
                  <div>
                    <label htmlFor="state" className={label}>State / Province</label>
                    <input id="state" type="text" className={input} />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country" className={label}>Country</label>
                    <select id="country" className={input}>
                      <option>United States</option>
                      <option>Mexico</option>
                      <option>Guatemala</option>
                      <option>Peru</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section className={panel}>
              <div className="px-8 md:px-12 py-6 md:py-8">
                <h2 className="mb-5 text-xl font-semibold text-slate-800">Shipping method</h2>

                <div className="space-y-5">
                  <label className="flex items-start gap-3">
                    <input className={radio} type="radio" name="ship" defaultChecked />
                    <span className="text-sm text-slate-700">
                      <span className="font-medium">Standard</span>
                      <span className="block text-slate-500">4–6 business days · <strong>$6.00</strong></span>
                    </span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input className={radio} type="radio" name="ship" />
                    <span className="text-sm text-slate-700">
                      <span className="font-medium">Expedited</span>
                      <span className="block text-slate-500">2–3 business days · <strong>$12.00</strong></span>
                    </span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input className={radio} type="radio" name="ship" />
                    <span className="text-sm text-slate-700">
                      <span className="font-medium">Priority</span>
                      <span className="block text-slate-500">1–2 business days · <strong>$22.00</strong></span>
                    </span>
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* Lado derecho */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <section className={panel}>
              <div className="px-8 md:px-10 py-6 md:py-8">
                <h2 className="mb-5 text-xl font-semibold text-slate-800">Payment</h2>

                {/* Stripe <PaymentElement /> */}
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label htmlFor="card" className={label}>Card number</label>
                    <input id="card" inputMode="numeric" className={input} placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cvc" className={label}>CVC</label>
                      <input id="cvc" inputMode="numeric" className={input} placeholder="123" />
                    </div>
                    <div>
                      <label htmlFor="exp" className={label}>Expiry (MM/YY)</label>
                      <input id="exp" inputMode="numeric" className={input} placeholder="12/34" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2">
                    <input id="save" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600" />
                    <span className="text-sm text-slate-700">Save my card</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Order summary con la real data once available en(localStorage) */}
            <section className={panel}>
              <div className="px-8 md:px-10 py-6 md:py-8">
                <h2 className="mb-5 text-xl font-semibold text-slate-800">Order summary</h2>

                <ul className="space-y-2 text-sm text-slate-700">
                  {items.length === 0 && <li className="text-slate-500">Your cart is empty.</li>}

                  {items.map((it, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{it.name} × {it.qty ?? 1}</span>
                      <span>{formatUSD(it.price * (it.qty ?? 1))}</span>
                    </li>
                  ))}

                  <li className="mt-3 flex justify-between border-t border-slate-200 pt-3">
                    <span>Subtotal</span>
                    <span>{formatUSD(subtotal)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Shipping</span>
                    <span>{formatUSD(shipping)}</span>
                  </li>
                  <li className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold">
                    <span>Total</span>
                    <span>{formatUSD(total)}</span>
                  </li>
                </ul>

                <button
                  type="button"
                  disabled={!items.length}
                  className="mt-6 w-full rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                >
                  {items.length ? `Pay ${formatUSD(total)}` : 'Cart is empty'}
                </button>

                <p className="mt-2 text-center text-xs text-slate-500">
                  By clicking “Pay”, I accept the Terms of use and cookies.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
