import Button from "../tools/Button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
export default function MatchSideSubHeader() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const isComplete = router.asPath.includes("playback");
  useEffect(() => {
    setMounted(true);
    setBaseUrl(router.asPath.replace(/#.*/, "").replace("playback/", ""));
  }, []);

  if (!mounted || router.asPath.includes("match")) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-[10px]">
      <Button
        text="未完賽"
        isActive={!isComplete}
        href={baseUrl}
        isHover={true}
      />
      <Button
        text="已完賽"
        isActive={isComplete}
        href={baseUrl + "playback/"}
        isHover={true}
      />
    </div>
  );
}
