import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Flex, Grid } from "../wrapper";
import { ModalBox } from "./Modal.wrapper";
import { PrimaryButton } from "../Form/Button";

import CloseIcon from "@/assets/icons/close.svg";
import { ISlippage } from "@/interfaces/interface";

interface IPercentageProps {
   selected: boolean;
   percentage: number;
   select: () => void;
}

function Percentage(props: IPercentageProps) {
   return <div onClick={props.select} className={`flex cursor-pointer bg-secondary_50 leading-none text-center text-white text_14_500_SFText rounded-[15px] py-2 ${props.selected ? "!bg-blue" : ""}`}>
      <span className="m-auto">{props.percentage}%</span>
   </div>
}

export default function SettingModal(props: {
   close: () => void;
   active: boolean;
   slippage: ISlippage;
   submit: (slippage: ISlippage) => void;
}) {

   const [customPercentage, setCustomPercentage] = useState<string>("");
   const [selectedPercentage, setSelectedPercentage] = useState<number>(0);

   function submit() {
      const newSlippage: ISlippage = {
         type: customPercentage ? "custom" : "default",
         value: customPercentage ? Number.parseFloat(customPercentage) : selectedPercentage
      }
      props.submit(newSlippage);
      props.close();
   }

   useEffect(() => {
      if (selectedPercentage && customPercentage)
         setSelectedPercentage(0);
   }, [customPercentage]);

   useEffect(() => {
      if (!selectedPercentage || !customPercentage) return;
      setCustomPercentage("");
   }, [selectedPercentage]);

   useEffect(() => {
      if (props.slippage.type === "default") {
         setSelectedPercentage(props.slippage.value)
      } else {
         setCustomPercentage(`${props.slippage.value}`);
      }
   }, [props.slippage]);

   return <ModalBox active={props.active}>
      <div className="p-6 !pb-10">
         <Flex className="justify-between mb-5">
            <span className="text-white text_20_700_SFText">Settings</span>
            <Image onClick={props.close} src={CloseIcon} alt="settings" className='my-auto cursor-pointer' />
         </Flex>
         <div className="my-4">
            <h4 className="text_15_700_SFText text-white leading-none">Slippage</h4>
            <p className="text_14_400_SFText leading-[16px] text-text_primary mt-4 block">Your transaction will revert if the price changes unfacorably by more than this percentage.</p>
         </div>
         <Grid className="grid-cols-2 gap-3 mt-4 mb-6">
            <input
               className="rounded-[15px] bg-secondary_50 outline-none px-3 py-2 text_14_500_SFText text-white"
               placeholder="Custom %"
               type="number"
               max={100}
               value={customPercentage}
               onChange={(event) => {
                  //Skip for value more than 100
                  if (Number.parseInt(event.currentTarget.value || "0") > 100) return;
                  const decimals = `${event.currentTarget.value}`.split(".")[1];
                  if (decimals && decimals.length >= 8) return;
                  setCustomPercentage(event.currentTarget.value)
               }}
            />
            <Grid className="grid-cols-3 gap-3">
               {
                  [1, 5, 10].map((percentage, index) => <Percentage
                     key={index}
                     percentage={percentage}
                     selected={selectedPercentage === percentage}
                     select={() => {
                        if (selectedPercentage === percentage)
                           percentage = 0;
                        setSelectedPercentage(percentage)
                     }}
                  />)
               }
            </Grid>
         </Grid>
         <PrimaryButton name="Save" click={submit} />
      </div>
   </ModalBox>
}
