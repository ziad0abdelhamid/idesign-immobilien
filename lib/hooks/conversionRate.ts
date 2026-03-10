"use client";

import { useEffect, useState } from "react";

export function useEgptoEur() {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch(
          "https://api.forexrateapi.com/v1/latest?api_key=9196c1178a71145a1dcefb6f69e77b83&base=EGP&currencies=EUR,INR,JPY",
        );
        const data = await res.json();
        setRate(data.result.EUR);
      } catch {
        setRate(0.018);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  return { rate, loading };
}
