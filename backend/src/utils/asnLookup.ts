import axios from "axios";

export async function ipToAsn(ip: string): Promise<string | null> {
  try {
    const url = `https://iptoasn.com/v1/as/ip/${ip}`;
    const res = await axios.get(url, { timeout: 3000 });
    // res.data example: { as_number: 209242, prefix: "45.155.205.0/24", ... }
    if (res.data && res.data.as_number) {
      return "AS" + String(res.data.as_number);
    }
    return null;
  } catch (e) {
    // network or API failure -> return null (non-fatal)
    return null;
  }
}
