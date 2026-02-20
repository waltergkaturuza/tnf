/* Payload CMS layout */
import config from "@payload-config";
import "@payloadcms/next/css";
import React from "react";

import { importMap } from "./admin/importMap.js";
import "./custom.scss";

type Args = { children: React.ReactNode };

const Layout = ({ children }: Args) => <>{children}</>;

export default Layout;
