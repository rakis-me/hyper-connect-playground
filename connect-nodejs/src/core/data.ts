import { ReaderT, Async, map } from "crocks";

const { of, ask, lift } = ReaderT(Async);

const addBody = (body: unknown) =>
  ask(map(
    (r: Request) =>
      new Request(r, { method: "POST", body: JSON.stringify(body) }),
  )).chain(lift);

const addQueryParams = (params : string) =>
  ask(map((r: Request) =>
    new Request(`${r.url}?${params}`, {
      headers: r.headers,
    })
  )).chain(lift);

const appendPath = (id: string) =>
  ask(map((r: Request) =>
    new Request(`${r.url}/${id}`, {
      headers: r.headers,
    })
  )).chain(lift);

const list = (params = {}) =>
  of(params)
    .map((p: Record<string, string>) => new URLSearchParams(p).toString())
    .chain(addQueryParams);

/**
 * add document to hyper
 */
const add = addBody;
const get = appendPath;
const update = (id: string, body: unknown) =>
  appendPath(id)
    .map((req: Request) =>
      new Request(req, { method: "PUT", body: JSON.stringify(body) })
    );

const remove = (id: string) =>
  appendPath(id)
    .map((req: Request) => new Request(req, { method: "DELETE" }));

const query = (selector = {}, options = {}) =>
  appendPath("_query")
    .map((req: Request) =>
      new Request(req, {
        method: "POST",
        body: JSON.stringify({ selector, ...options }),
      })
    );

const bulk = (docs: Array<unknown>) =>
  appendPath("_bulk")
    .map((req: Request) =>
      new Request(req, {
        method: "POST",
        body: JSON.stringify(docs),
      })
    );

const index = (name: string, fields: Array<string>) =>
  appendPath("_index")
    .map((req: Request) =>
      new Request(req, {
        method: "POST",
        body: JSON.stringify({
          fields,
          name,
          type: "json",
        }),
      })
    );

const create = () =>
  ask(map((req: Request) => new Request(req, { method: "PUT" }))).chain(lift);

const destroy = (confirm = false) =>
  confirm
    ? ask(map((r: Request) => new Request(r, { method: "DELETE" }))).chain(lift)
    : of({ msg: "not confirmed" });

interface Data {
  add: Function,
  list: Function,
  get: Function,
  update: Function,
  remove: Function,
  query: Function,
  index: Function,
  bulk: Function,
  create: Function,
  destroy: Function,
} 

const data: Data = {
  add,
  list,
  get,
  update,
  remove,
  query,
  index,
  bulk,
  create,
  destroy,
};

export default data;
