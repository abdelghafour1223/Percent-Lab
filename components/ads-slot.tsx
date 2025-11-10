"use client";

import { cn } from "@/lib/utils";

interface AdsSlotProps {
  /**
   * AdSense slot ID (e.g., "1234567890")
   */
  slot?: string;
  /**
   * Ad format (e.g., "auto", "rectangle", "horizontal")
   */
  format?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Placement identifier for analytics
   */
  placement?: "top" | "bottom" | "sidebar";
}

/**
 * AdSense placeholder component
 * NOTE: AdSense script should be added to the site manually in production
 * Add this script to your <head>:
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>
 */
export function AdsSlot({ slot, format = "auto", className, placement = "top" }: AdsSlotProps) {
  return (
    <div className={cn("my-8 flex justify-center", className)}>
      <div
        className="min-h-[250px] w-full max-w-[970px] flex items-center justify-center bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg"
        data-placement={placement}
      >
        {/* Placeholder for AdSense ad */}
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXX"}
          data-ad-slot={slot || "0000000000"}
          data-ad-format={format}
          data-full-width-responsive="true"
        >
          {/* Development placeholder */}
          {process.env.NODE_ENV === "development" && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Ad Placeholder ({placement})</p>
              <p>Slot: {slot || "not-set"}</p>
              <p className="text-xs mt-2">This will display an AdSense ad in production</p>
            </div>
          )}
        </ins>
      </div>
    </div>
  );
}
