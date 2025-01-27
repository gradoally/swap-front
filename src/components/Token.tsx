import Image from "next/image";
import { useEffect, useState } from "react";

import { Box, Flex } from "@/components/wrapper";

import DefaultIcon from "@/assets/icons/DEFAULICON.png";
import ArrowRightIcon from "@/assets/icons/right-arrow.svg";

import { IToken } from "@/interfaces/interface";

interface ITokenProps {
    token: IToken;
    balance?: number;
    select: () => void;
}

export function TokenIcon(props: { icon: string; name: string; }) {

    const [icon, setIcon] = useState<string>(DefaultIcon.src);

    useEffect(() => {
      setIcon(props.icon);
    },[props.icon]);

    return <img
        src={icon}
        alt={props.name}
        className="my-auto w-[24px] h-[24px] rounded-full"
        onError={
            () => setIcon(DefaultIcon.src)
        }
    />
    /*props.icon && !icon ? <Image
        width={24}
        height={24}
        className="my-auto w-[24px] h-[24px] rounded-full"
        src={props.icon}
        alt={props.name}
        onError={
            () => setIcon(DefaultIcon.src)
        }
        loading='eager'
    /> : <Image
        width={24}
        height={24}
        className="my-auto w-[24px] h-[24px] rounded-full"
        src={DefaultIcon}
        alt={props.name}
        loading='eager'
    />*/
}

export function TokenName(props: { name: string; className?: string }) {
    return <span title={props.name} className={`text_14_400_SFText truncate text-white leading-[17px] my-auto ${props.className}`}>{props.name}</span>
}

export function SuggestedToken(props: ITokenProps) {
    return <Box className="flex !w-fit !h-fit p-2 px-[10px] cursor-pointer !border-none !bg-secondary_50" click={props.select}>
        <Flex className="!w-fit m-auto gap-2">
            <TokenIcon icon={props.token.image} name={props.token.name} />
            <TokenName name={props.token.symbol} />
        </Flex>
    </Box>
}

export function ListToken(props: ITokenProps) {
    return <Flex className="justify-between cursor-pointer" click={props.select}>
        <Flex className="!w-fit gap-4">
            <TokenIcon icon={props.token.image} name={props.token.name} />
            <TokenName name={props.token.symbol} />
        </Flex>
        <Flex className="!w-fit gap-2">
            <span className={`text_14_400_SFText leading-none text-text_primary my-auto ${props.token.balance ? "" : "hidden"}`}>{props.token.balance}{" "}{props.token.symbol}</span>
            <Image className="my-auto" loading="lazy" src={ArrowRightIcon} alt={"arrow-right"} />
        </Flex>
    </Flex>
}
