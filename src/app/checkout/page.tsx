'use client';

import React from 'react';

export default function Checkout() {
  // estilos reutilizables
  const input =
    'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600';
  const label = 'text-sm font-medium text-slate-700';
  const radio = 'h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-slate-300';

  // paneles internos con buen aire
  const section = 'rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm';

  return (
    // 1) Página limpia, sin fondo verde, y centrado absoluto
    <main className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      {/* 2) ÚNICA CARD centrada con padding amplio en todos los bordes */}
      <div className="w-full max-w-5xl rounded-2xl bg-white p-8 md:p-12 shadow-2xl ring-1 ring-black/5">
        <h1 className="mb-10 text-center text-3xl font-bold text-emerald-900">Checkout</h1>

        {/* GRID 2 columnas (1 en mobile) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* COLUMNA IZQUIERDA */}
          <div className="flex flex-col gap-8">
            {/* Shipping address */}
            <section className={section}>
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Shipping address</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            </section>

            {/* Shipping method */}
            <section className={section}>
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Shipping method</h2>

              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input className={radio} type="radio" name="ship" defaultChecked />
                  <span className="text-sm text-slate-700">
                    <span className="font-medium">Standard</span>
                    <span className="block text-slate-500">
                      4–6 business days · <strong>$6.00</strong>
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input className={radio} type="radio" name="ship" />
                  <span className="text-sm text-slate-700">
                    <span className="font-medium">Expedited</span>
                    <span className="block text-slate-500">
                      2–3 business days · <strong>$12.00</strong>
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input className={radio} type="radio" name="ship" />
                  <span className="text-sm text-slate-700">
                    <span className="font-medium">Priority</span>
                    <span className="block text-slate-500">
                      1–2 business days · <strong>$22.00</strong>
                    </span>
                  </span>
                </label>
              </div>
            </section>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col gap-8">
            {/* Payment */}
            <section className={section}>
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Payment</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <label htmlFor="card" className={label}>Card number</label>
                  <input id="card" inputMode="numeric" className={input} placeholder="4242 4242 4242 4242" />
                </div>
                <div>
                  <label htmlFor="cvc" className={label}>CVC</label>
                  <input id="cvc" inputMode="numeric" className={input} placeholder="123" />
                </div>
                <div>
                  <label htmlFor="exp" className={label}>Expiry (MM/YY)</label>
                  <input id="exp" inputMode="numeric" className={input} placeholder="12/34" />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    id="save"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                  />
                  <label htmlFor="save" className="text-sm text-slate-700">Save my card</label>
                </div>
              </div>
            </section>

            {/* Order summary */}
            <section className={section}>
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Order summary</h2>

              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex justify-between">
                  <span>Handmade Journal × 1</span>
                  <span>$24.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Ceramic Mug × 2</span>
                  <span>$36.00</span>
                </li>

                <li className="mt-3 flex justify-between border-t border-slate-200 pt-3">
                  <span>Subtotal</span>
                  <span>$60.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Shipping</span>
                  <span>$6.00</span>
                </li>

                <li className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold">
                  <span>Total</span>
                  <span>$66.00</span>
                </li>
              </ul>

              <button
                type="button"
                className="mt-6 w-full rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                Pay $66.00
              </button>

              <p className="mt-2 text-center text-xs text-slate-500">
                By clicking “Pay”, I accept the Terms of use and cookies.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
