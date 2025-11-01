import React, { useState } from "react";
import products from './data/products';

export default function App() {
  const [lang, setLang] = useState("en");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const name = lang === "en" ? p.name_en : p.name_es;
    const desc = lang === "en" ? p.desc_en : p.desc_es;
    return (name + " " + desc).toLowerCase().includes(query.toLowerCase()) && (category === "All" || p.category === category);
  });

  const contactEmail = 'akwakovsky@gmail.com';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{lang === "en" ? "Bulk Market" : "Mercado al por Mayor"}</h1>
          <p className="mt-1 text-sm text-gray-600">{lang === "en" ? "Wholesale offers — catalog only. Request quotes for orders." : "Ofertas al por mayor — solo catálogo. Solicita presupuesto para pedidos."}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-gray-500">{lang === "en" ? "Language" : "Idioma"}:</span>
            <button onClick={() => setLang("en")} className={`px-3 py-1 rounded ${lang === "en" ? "bg-gray-900 text-white" : "bg-white border"}`}>EN</button>
            <button onClick={() => setLang("es")} className={`px-3 py-1 rounded ${lang === "es" ? "bg-gray-900 text-white" : "bg-white border"}`}>ES</button>
          </div>
          <button onClick={() => alert(lang === "en" ? `Contact: ${contactEmail}` : `Contacto: ${contactEmail}`)} className="px-4 py-2 bg-blue-600 text-white rounded">{lang === "en" ? "Request Quote" : "Solicitar Presupuesto"}</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        <section className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === "en" ? "Search products, descriptions..." : "Buscar productos, descripciones..."} className="w-full p-3 rounded border" />
          </div>
          <div className="w-full md:w-56">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 rounded border">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src={p.image} alt={lang === "en" ? p.name_en : p.name_es} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-medium text-lg">{lang === "en" ? p.name_en : p.name_es}</h3>
                <p className="mt-2 text-sm text-gray-600">{(lang === "en" ? p.desc_en : p.desc_es).slice(0, 120)}{(lang === "en" ? p.desc_en : p.desc_es).length > 120 ? '...' : ''}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
                  <div>
                    <div className="text-xs text-gray-500">{lang === "en" ? "MOQ" : "MOQ"}:</div>
                    <div className="font-semibold">{p.moq}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{lang === "en" ? "Price" : "Precio"}</div>
                    <div className="font-semibold">{p.price}</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setSelected(p)} className="flex-1 py-2 rounded border">{lang === "en" ? "View" : "Ver"}</button>
                  <a href={`mailto:${contactEmail}?subject=${encodeURIComponent((lang === 'en' ? 'Quote request' : 'Solicitud de presupuesto') + ' - ' + (lang==='en'?p.name_en:p.name_es))}&body=${encodeURIComponent((lang==='en'?'Please provide a quote for':'Por favor envíe presupuesto para') + ' ' + (lang==='en'?p.name_en:p.name_es) + ' - MOQ: ' + p.moq)}`} className="py-2 px-4 rounded bg-green-600 text-white">{lang === "en" ? "Request" : "Solicitar"}</a>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full bg-white rounded p-6 text-center text-gray-600">{lang === "en" ? "No products found." : "No se encontraron productos."}</div>
          )}
        </section>

        <footer className="mt-10 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row md:justify-between gap-3 items-start md:items-center">
            <div>{lang === "en" ? "© 2025 Bulk Market — Catalog only. All prices indicative." : "© 2025 Mercado al por Mayor — Solo catálogo. Todos los precios indicativos."}</div>
            <div className="flex gap-4">
                <a href="#contact" className="underline">{lang === "en" ? "Contact" : "Contacto"}</a>
                <a href="#about" className="underline">{lang === "en" ? "About" : "Acerca de"}</a>
            </div>
          </div>
        </footer>
      </main>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white max-w-3xl w-full rounded-lg overflow-hidden">
            <div className="p-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{lang === "en" ? selected.name_en : selected.name_es}</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert(lang === 'en' ? 'Link copied' : 'Enlace copiado'); }} className="px-3 py-1 border rounded">{lang === "en" ? "Copy link" : "Copiar enlace"}</button>
                <button onClick={() => setSelected(null)} className="px-3 py-1 rounded bg-gray-200">{lang === "en" ? "Close" : "Cerrar"}</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <img src={selected.image} alt="product" className="w-full h-64 object-cover rounded" />
              <div>
                <p className="text-sm text-gray-700">{lang === "en" ? selected.desc_en : selected.desc_es}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li><strong>{lang === "en" ? "MOQ:" : "MOQ:"}</strong> {selected.moq}</li>
                  <li><strong>{lang === "en" ? "Price (indicative):" : "Precio (indicativo):"}</strong> {selected.price}</li>
                  <li><strong>{lang === "en" ? "Category:" : "Categoría:"}</strong> {selected.category}</li>
                </ul>

                <div className="mt-6 flex gap-3">
                  <a href={`mailto:${contactEmail}?subject=${encodeURIComponent((lang === 'en' ? 'Quote request' : 'Solicitud de presupuesto') + ' - ' + (lang==='en'?selected.name_en:selected.name_es))}`} className="px-4 py-2 bg-blue-600 text-white rounded">{lang === "en" ? "Request quote" : "Solicitar presupuesto"}</a>
                  <button onClick={() => { const body = `${lang === 'en' ? 'Please provide a quote for' : 'Por favor envíe presupuesto para'} ${lang==='en'?selected.name_en:selected.name_es} (MOQ: ${selected.moq})`; window.open(`mailto:${contactEmail}?subject=${encodeURIComponent(lang==='en'?'Quote request':'Solicitud de presupuesto')}&body=${encodeURIComponent(body)}`); }} className="px-4 py-2 border rounded">{lang === "en" ? "Email sales" : "Enviar email"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
