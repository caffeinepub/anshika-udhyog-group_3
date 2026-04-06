import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, Package, Search, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SERVICES_DATA = [
  {
    name: "Local City Delivery",
    range: "Within City",
    time: "Same Day",
    price: "\u20B940-100",
  },
  {
    name: "Inter-City Transport",
    range: "UP, Bihar, MP",
    time: "1-3 Days",
    price: "\u20B9150-500",
  },
  {
    name: "Door-to-Door Service",
    range: "All India",
    time: "3-7 Days",
    price: "\u20B9200-800",
  },
  {
    name: "Bulk Cargo",
    range: "All India",
    time: "5-10 Days",
    price: "Custom",
  },
];

export function ShippingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [trackResult, setTrackResult] = useState<null | {
    status: string;
    location: string;
    updated: string;
  }>(null);
  const [booking, setBooking] = useState({
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    weight: "",
    serviceType: "",
  });

  const handleTrack = () => {
    if (!trackingId.trim()) {
      toast.error("Enter tracking ID");
      return;
    }
    setTrackResult({
      status: "In Transit",
      location: "Lucknow, UP",
      updated: new Date().toLocaleString("en-IN"),
    });
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `AUG${Date.now().toString().slice(-8)}`;
    toast.success(`Booking confirmed! Tracking ID: ${id}`);
    setBooking({
      senderName: "",
      senderPhone: "",
      receiverName: "",
      receiverPhone: "",
      pickupAddress: "",
      deliveryAddress: "",
      weight: "",
      serviceType: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div
        className="py-10 md:py-16 text-white text-center px-4"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          🚚 Shipping & Logistics
        </h1>
        <p className="text-green-100">
          Reliable transport services across India
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Track Shipment */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-700" /> Track Shipment
          </h2>
          <div className="flex gap-3">
            <Input
              placeholder="Enter tracking ID (e.g. AUG12345678)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              data-ocid="shipping.track.input"
            />
            <Button
              onClick={handleTrack}
              style={{ backgroundColor: "#166534" }}
              data-ocid="shipping.track.button"
            >
              <Search className="w-4 h-4 mr-2" /> Track
            </Button>
          </div>
          {trackResult && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Badge style={{ backgroundColor: "#166534" }}>In Transit</Badge>
                <span className="text-sm text-gray-500">
                  Updated: {trackResult.updated}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-green-600" />
                Current Location: <strong>{trackResult.location}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Rate Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-green-700" /> Service Rates
          </h2>
          <Table data-ocid="shipping.rates.table">
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SERVICES_DATA.map((s, sIdx) => (
                <TableRow
                  key={s.name}
                  data-ocid={`shipping.rate.item.${sIdx + 1}`}
                >
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.range}</TableCell>
                  <TableCell>{s.time}</TableCell>
                  <TableCell className="font-bold text-green-700">
                    {s.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Book Shipment
          </h2>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label>Sender Name *</Label>
              <Input
                required
                value={booking.senderName}
                onChange={(e) =>
                  setBooking((p) => ({ ...p, senderName: e.target.value }))
                }
                className="mt-1"
                data-ocid="shipping.booking.sender.input"
              />
            </div>
            <div>
              <Label>Sender Phone *</Label>
              <Input
                required
                type="tel"
                value={booking.senderPhone}
                onChange={(e) =>
                  setBooking((p) => ({ ...p, senderPhone: e.target.value }))
                }
                className="mt-1"
                data-ocid="shipping.booking.sender_phone.input"
              />
            </div>
            <div>
              <Label>Receiver Name *</Label>
              <Input
                required
                value={booking.receiverName}
                onChange={(e) =>
                  setBooking((p) => ({ ...p, receiverName: e.target.value }))
                }
                className="mt-1"
                data-ocid="shipping.booking.receiver.input"
              />
            </div>
            <div>
              <Label>Receiver Phone *</Label>
              <Input
                required
                type="tel"
                value={booking.receiverPhone}
                onChange={(e) =>
                  setBooking((p) => ({ ...p, receiverPhone: e.target.value }))
                }
                className="mt-1"
                data-ocid="shipping.booking.receiver_phone.input"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Pickup Address *</Label>
              <Input
                required
                value={booking.pickupAddress}
                onChange={(e) =>
                  setBooking((p) => ({ ...p, pickupAddress: e.target.value }))
                }
                className="mt-1"
                data-ocid="shipping.booking.pickup.input"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Delivery Address *</Label>
              <Input
                required
                value={booking.deliveryAddress}
                onChange={(e) =>
                  setBooking((p) => ({ ...p, deliveryAddress: e.target.value }))
                }
                className="mt-1"
                data-ocid="shipping.booking.delivery.input"
              />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                value={booking.weight}
                onChange={(e) =>
                  setBooking((p) => ({ ...p, weight: e.target.value }))
                }
                className="mt-1"
                data-ocid="shipping.booking.weight.input"
              />
            </div>
            <div className="md:col-span-2">
              <Button
                type="submit"
                className="w-full"
                style={{ backgroundColor: "#166534" }}
                data-ocid="shipping.booking.submit_button"
              >
                Book Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
