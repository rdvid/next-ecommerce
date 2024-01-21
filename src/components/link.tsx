import { LinkPropsType } from "@/types/link";
import NextLink from "next/link";

export default function Link({children, href}: LinkPropsType){
    return (
        <NextLink href={href}>
            {children}
        </NextLink>
    );
}