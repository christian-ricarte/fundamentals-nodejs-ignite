import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      return res.end(
        JSON.stringify(
          database.select(
            "users",
            search
              ? {
                  name: search,
                  email: search,
                }
              : null
          )
        )
      );
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      database.insert("users", {
        id: randomUUID(),
        name: req.body.name,
        email: req.body.email,
      });

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      database.update("users", req.params.id, {
        name: req.body.name,
        email: req.body.email,
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      database.delete("users", req.params.id);

      return res.writeHead(204).end();
    },
  },
];
