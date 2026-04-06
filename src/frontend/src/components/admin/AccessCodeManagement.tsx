import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import type { LocalMember } from "../../types";

interface AccessCodeManagementProps {
  members: LocalMember[];
  onUpdate: (id: string, updates: Partial<LocalMember>) => void;
}

function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function AccessCodeManagement({
  members,
  onUpdate,
}: AccessCodeManagementProps) {
  const handleReset = (member: LocalMember) => {
    const newCode = generateAccessCode();
    onUpdate(member.id, { accessCode: newCode });
    toast.success(`Access code reset for ${member.name}. New code: ${newCode}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">
        Access Code Management
      </h2>
      <p className="text-sm text-gray-500">
        Reset member access codes. The new code will be displayed in the
        notification once reset.
      </p>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600">Member</th>
              <th className="text-left px-4 py-3 text-gray-600">ID</th>
              <th className="text-left px-4 py-3 text-gray-600">Mobile</th>
              <th className="text-left px-4 py-3 text-gray-600">Status</th>
              <th className="text-left px-4 py-3 text-gray-600">
                Current Code
              </th>
              <th className="text-left px-4 py-3 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {members.map((m, idx) => (
              <tr
                key={m.id}
                data-ocid={`access_codes.row.${idx + 1}`}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                  {m.id}
                </td>
                <td className="px-4 py-3">{m.phone}</td>
                <td className="px-4 py-3">
                  <Badge
                    className={
                      m.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {m.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-mono">{m.accessCode}</td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReset(m)}
                    data-ocid={`access_codes.reset.button.${idx + 1}`}
                    className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" /> Reset
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
