import { Async } from 'crocks'
import { assoc, lensPath, over, ifElse, defaultTo, identity } from 'ramda';
import { SignJWT } from "jose"

const generateToken = async (sub : string, secret : string) => {
  const crypto = await import("crypto");
  const key = crypto.createSecretKey(secret, 'utf-8');
  const token = await new SignJWT({ sub })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")
    .sign(key);
  return token;
};

export const buildRequest = (cs : URL) =>
  (service : string, domain : string) => {
    
    let app = cs.pathname;
    if (service === "_root") {
      app = "";
      service = "";
    }

    return Async.of({
      url: "",
      headers: "",
      isHyperCloud: cs.protocol === "cloud:",
      domain,
    })
      .map((request : any) =>
        over(
          lensPath(["domain"]),
          ifElse(
            () => request.isHyperCloud,
            defaultTo("default"), // hyper cloud defaults service names to 'default'
            identity,
          ),
          request,
        )
      )
      .map(assoc("headers", { "Content-Type": "application/json" }))
      .chain((request : any) =>
        cs.password !== ""
          ? Async.fromPromise(generateToken)(cs.username, cs.password)
            .map((token : string) =>
              over(lensPath(["headers", "authorization"]), (_) =>
                `Bearer ${token}`, request)
            )
          : Async.Resolved(request)
      )
      .map(({ headers, isHyperCloud, domain } : any) =>
        new Request(
          `${
            isHyperCloud
              ? "https:"
              : cs.protocol
          }//${cs.host}${isHyperCloud ? app : ""}${
            service !== "" ? "/" + service : ""
          }${!isHyperCloud ? app : "/"}${domain ? domain : ""}`,
          {
            headers,
          },
        )
      );
  };