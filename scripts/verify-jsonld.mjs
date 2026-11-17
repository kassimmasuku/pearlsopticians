import fs from "node:fs";

const files = {
  "/": "dist/index.html",
  "/about": "dist/about/index.html",
  "/frames": "dist/frames/index.html",
  "/learn": "dist/learn/index.html",
};

const badPhone = "773019213";
const retiredMarkers = ["Union Ave", "Chinhoyi Mall", "Suites 17"];

for (const [route, file] of Object.entries(files)) {
  const html = fs.readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  console.log(`\n=== ${route} (${file}) ===`);
  console.log("json-ld script count:", scripts.length);
  console.log("retired phone present:", html.includes(badPhone));
  console.log(
    "outdated address markers:",
    retiredMarkers.filter((m) => html.includes(m)),
  );

  if (!scripts.length) {
    console.log("FAIL: no json-ld");
    continue;
  }

  for (const match of scripts) {
    let data;
    try {
      data = JSON.parse(match[1]);
      console.log("JSON parse: OK");
    } catch (error) {
      console.log("JSON parse FAIL", error.message);
      continue;
    }

    const graph = data["@graph"] || [];
    console.log(
      "types:",
      graph.map((n) => `${n["@type"]} ${n["@id"] || ""}`).join(" | "),
    );
    const org = graph.find((n) => n["@id"]?.includes("#organization"));
    const page = graph.find((n) =>
      ["WebPage", "AboutPage", "CollectionPage"].includes(n["@type"]),
    );
    console.log("org:", org?.name, "departments:", org?.department?.length);
    console.log("page:", page?.["@type"], page?.url);
    console.log(
      "phones:",
      graph.filter((n) => n.telephone).map((n) => `${n.name}=${n.telephone}`).join("; "),
    );
    console.log(
      "streets:",
      graph
        .filter((n) => n.address)
        .map((n) => `${n.name}=>${n.address.streetAddress}`)
        .join("; "),
    );
  }

  const canon = html.match(/rel="canonical" href="([^"]+)"/);
  console.log("canonical:", canon?.[1]);
}

console.log("\nsitemap exists:", fs.existsSync("dist/sitemap.xml"));
console.log("robots exists:", fs.existsSync("dist/robots.txt"));
console.log(
  "robots sitemap line:",
  fs.readFileSync("dist/robots.txt", "utf8").includes("Sitemap: https://pearlsopticians.co.zw/sitemap.xml"),
);
