import React, { useState } from "react";
import { PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchIcons } from "@/services/iconService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconPickerProps {
  onIconSelect: (iconPath: string, color: string) => void;
}

export function IconPicker({ onIconSelect }: IconPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [icons, setIcons] = useState(searchIcons(""));

  const handleSearch = (query: string) => {
    const results = searchIcons(query);
    setIcons(results);
  };

  return (
    <PopoverContent className="w-[320px] mt-48" side="right">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="İkon Ara"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto">
          {icons.map((icon) => (
            <Button
              key={icon.id}
              variant="outline"
              className="h-12 w-12 p-0 hover:bg-gray-100"
              onClick={() => {
                const path = icon.icon.icon[4] as string;
                onIconSelect(path, "#000000");
              }}
            >
              <FontAwesomeIcon icon={icon.icon} className="h-6 w-6" />
            </Button>
          ))}
        </div>
      </div>
    </PopoverContent>
  );
}
