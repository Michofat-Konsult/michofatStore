"use client";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { products } from "@/lib/products";
import { money } from "@/lib/utils";
export default function Compare() {
  const { compare, toggleCompare, add } = useStore();
  const selected = products.filter((p) => compare.includes(p.id));
  return (
    <div className="container page-space">
      <div className="page-title">
        <h1>Compare products</h1>
        <p>
          Your shortlist, side by side. Select up to four products using the
          compare icon.
        </p>
      </div>
      {!selected.length ? (
        <div className="empty-state">
          <h2>Your comparison starts here</h2>
          <Link className="retail-button" href="/shop">
            Explore products
          </Link>
        </div>
      ) : (
        <div className="compare-scroll">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Product</th>
                {selected.map((p) => (
                  <th key={p.id}>
                    <button
                      aria-label={`Remove ${p.name} from comparison`}
                      onClick={() => toggleCompare(p.id)}
                    >
                      <X size={16} />
                    </button>
                    <Image
                      unoptimized
                      src={p.image}
                      alt={p.name}
                      width={170}
                      height={170}
                    />
                    <Link href={`/product/${p.id}`}>{p.name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Price", "Brand", "Category", "Rating", "Availability"].map(
                (label) => (
                  <tr key={label}>
                    <th>{label}</th>
                    {selected.map((p) => (
                      <td key={p.id}>
                        {label === "Price"
                          ? money(p.price)
                          : label === "Brand"
                            ? p.brand
                            : label === "Category"
                              ? p.category
                              : label === "Rating"
                                ? `${p.rating} / 5`
                                : `${p.stock} in stock`}
                      </td>
                    ))}
                  </tr>
                ),
              )}
              <tr>
                <th>Specifications</th>
                {selected.map((p) => (
                  <td key={p.id}>
                    {Object.entries(p.specs).map(([k, v]) => (
                      <p key={k}>
                        <strong>{k}:</strong> {v}
                      </p>
                    ))}
                  </td>
                ))}
              </tr>
              <tr>
                <th>Shop</th>
                {selected.map((p) => (
                  <td key={p.id}>
                    <button className="retail-button" onClick={() => add(p.id)}>
                      Add to cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
