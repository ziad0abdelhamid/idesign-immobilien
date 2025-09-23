"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import AddPropertyDialog from "@/components/AddPropertyDialog";
import EditPropertyDialog from "@/components/EditPropertyDialog";


export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location_city: string;
  location_address: string;
  property_type: string;
  rooms: number;
  ground_area: number;
  house_area: number;
  images: string[];
}

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from Supabase
  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")

    if (error) {
      console.error("Error fetching properties:", error);
    } else {
      setProperties(data as Property[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const deleteProperty = async (id: string) => {
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting property:", error);
    } else {
      fetchProperties();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Tabs defaultValue="properties">
        <TabsList className="flex justify-center mb-6 gap-4">
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            <AddPropertyDialog onRecordAdded={fetchProperties} />
          </div>

          {loading ? (
            <p>Loading properties...</p>
          ) : properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">City</th>
                    <th className="px-4 py-2 border">Address</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Rooms</th>
                    <th className="px-4 py-2 border">Ground Area</th>
                    <th className="px-4 py-2 border">House Area</th>
                    <th className="px-4 py-2 border">Images</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{p.title}</td>
                      <td className="px-4 py-2 border">{p.price}</td>
                      <td className="px-4 py-2 border">{p.location_city}</td>
                      <td className="px-4 py-2 border">{p.location_address}</td>
                      <td className="px-4 py-2 border">{p.property_type}</td>
                      <td className="px-4 py-2 border">{p.rooms}</td>
                      <td className="px-4 py-2 border">{p.ground_area}</td>
                      <td className="px-4 py-2 border">{p.house_area}</td>
                      <td className="px-4 py-2 border">
                        {p.images?.length > 0 ? (
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        <EditPropertyDialog
                          record={p}
                          onRecordUpdated={fetchProperties}
                        />
                        <Button
                          variant="destructive"
                          className="ml-2 cursor-pointer hover:scale-105 transition"
                          onClick={() => deleteProperty(p.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
