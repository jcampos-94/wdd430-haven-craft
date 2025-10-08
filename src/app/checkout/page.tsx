'use client';

import React, { useState, useEffect } from 'react';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5s de “carga”
    return () => clearTimeout(timer);
  }, []);

  const card =
    'rounded-xl border border-black/5 bg-white/90 shadow-lg p-8 md:p-10 dark:bg-neutral-900/90 dark:border-white/10';

  const input =
    'mt-1 block w-full rounded-md border border-neutral-300 bg-white/95 px-3 py-2 text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 dark:placeholder:text-neutral-500';

  const label =
    'mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200';

  const radio =
    'h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-neutral-300 dark:border-neutral-600';

  const Skeleton = ({ className }: { className?: string }) => (
    <div className={`bg-neutral-300/70 dark:bg-neutral-700 animate-pulse rounded ${className}`}></div>
  );

  return (
    <main className="flex justify-center px-4 py-16">
      <div className="w-full max-w-6xl">
        {isLoading ? (
          <Skeleton className="h-10 w-48 mx-auto mb-14" />
        ) : (
          <h1 className="mb-14 text-center text-3xl font-bold text-white">Checkout</h1>
        )}

        <div className="grid grid-cols-1 gap-y-12 gap-x-12 lg:grid-cols-2">
          {/* Columna Left */}
          <div className="space-y-10">
            <section className={card}>
              <h2 className="mb-6 text-lg font-semibold">Shipping address</h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {isLoading ? (
                  <>
                    <div className="md:col-span-2">
                      <Skeleton className="h-6 w-full mb-4" />
                    </div>
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </>
                ) : (
                  <>
                    <div className="md:col-span-2">
                      <label htmlFor="email" className={label}>
                        Email
                      </label>
                      <input id="email" type="email" className={input} />
                    </div>
                    <div>
                      <label htmlFor="postal" className={label}>
                        Postal code
                      </label>
                      <input id="postal" type="text" className={input} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={label}>
                        Phone number
                      </label>
                      <input id="phone" type="tel" className={input} />
                    </div>
                    <div>
                      <label htmlFor="first" className={label}>
                        First name
                      </label>
                      <input id="first" type="text" className={input} />
                    </div>
                    <div>
                      <label htmlFor="last" className={label}>
                        Last name
                      </label>
                      <input id="last" type="text" className={input} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="addr1" className={label}>
                        Address line 1
                      </label>
                      <input id="addr1" type="text" className={input} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="addr2" className={label}>
                        Address line 2 (optional)
                      </label>
                      <input id="addr2" type="text" className={input} />
                    </div>
                    <div>
                      <label htmlFor="city" className={label}>
                        City
                      </label>
                      <input id="city" type="text" className={input} />
                    </div>
                    <div>
                      <label htmlFor="state" className={label}>
                        State / Province
                      </label>
                      <input id="state" type="text" className={input} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="country" className={label}>
                        Country
                      </label>
                      <select id="country" className={input}>
                        <option>United States</option>
                        <option>Mexico</option>
                        <option>Guatemala</option>
                        <option>Peru</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </section>

            <section className={card}>
              <h2 className="mb-6 text-lg font-semibold">Shipping method</h2>
              <div className="space-y-4">
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-2/5" />
                  </>
                ) : (
                  <>
                    <label className="flex items-start gap-3">
                      <input className={radio} type="radio" name="ship" defaultChecked />
                      <span className="text-sm">
                        <span className="font-medium">Standard</span>
                        <span className="block text-neutral-500 dark:text-neutral-400">
                          4–6 business days · <strong>$6.00</strong>
                        </span>
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input className={radio} type="radio" name="ship" />
                      <span className="text-sm">
                        <span className="font-medium">Expedited</span>
                        <span className="block text-neutral-500 dark:text-neutral-400">
                          2–3 business days · <strong>$12.00</strong>
                        </span>
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input className={radio} type="radio" name="ship" />
                      <span className="text-sm">
                        <span className="font-medium">Priority</span>
                        <span className="block text-neutral-500 dark:text-neutral-400">
                          1–2 business days · <strong>$22.00</strong>
                        </span>
                      </span>
                    </label>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Columna Right */}
          <div className="space-y-10">
            <section className={card}>
              <h2 className="mb-6 text-lg font-semibold">Payment</h2>
              <div className="space-y-6">
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-2/3" />
                  </>
                ) : (
                  <div>
                    <p className="mb-2 text-sm font-medium">Add card</p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <label htmlFor="card" className={label}>
                          Card number
                        </label>
                        <input id="card" inputMode="numeric" className={input} placeholder="4242 4242 4242 4242" />
                      </div>
                      <div>
                        <label htmlFor="cvc" className={label}>
                          CVC
                        </label>
                        <input id="cvc" inputMode="numeric" className={input} placeholder="123" />
                      </div>
                      <div>
                        <label htmlFor="exp" className={label}>
                          Expiry (MM/YY)
                        </label>
                        <input id="exp" inputMode="numeric" className={input} placeholder="12/34" />
                      </div>
                      <div className="md:col-span-2 flex items-center gap-2">
                        <input
                          id="save"
                          type="checkbox"
                          className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-600 dark:border-neutral-600"
                        />
                        <label htmlFor="save" className="text-sm text-neutral-700 dark:text-neutral-300">
                          Save my card
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className={card}>
              <h2 className="mb-6 text-lg font-semibold">Order summary</h2>
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full mt-2" />
                  <Skeleton className="h-6 w-3/4 mt-4" />
                  <Skeleton className="h-8 w-full mt-4" />
                </>
              ) : (
                <>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Handmade Journal × 1</span>
                      <span>$24.00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Ceramic Mug × 2</span>
                      <span>$36.00</span>
                    </li>
                    <li className="mt-3 border-t border-black/10 pt-3 dark:border-white/10 flex justify-between">
                      <span>Subtotal</span>
                      <span>$60.00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Shipping</span>
                      <span>$6.00</span>
                    </li>
                    <li className="border-t border-black/10 pt-3 dark:border-white/10 flex justify-between text-base font-semibold">
                      <span>Total</span>
                      <span>$66.00</span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="mt-8 w-full rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                  >
                    Pay $66.00
                  </button>

                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 text-center">
                    By clicking “Pay”, I accept the Terms of use and cookies.
                  </p>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
