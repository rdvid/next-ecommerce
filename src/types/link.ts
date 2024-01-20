import { ReactNode, CSSProperties } from "react"

export type LinkPropsType = {
    children: ReactNode;
    href: string;
    props?: CSSProperties;
}