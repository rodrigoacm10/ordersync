interface OrderProps {
  quantity: number;
  product: string;
}

interface AllOrdersInfosProps {
  title: string;
  ordersProduct: OrderProps[];
}

export function AllOrdersInfos({ title, ordersProduct }: AllOrdersInfosProps) {
  return (
    <div className="mt-[20px]">
      <div className="flex items-center font-bold text-[17px]  medium:text-[20px] justify-between">
        <h3 className=" ">{title}</h3>
        <span>{ordersProduct.length}</span>
      </div>
      <ul className="flex gap-2 medium:gap-1 mt-1 text-[#828282] text-[14px]  medium:text-[16px] flex-col">
        {ordersProduct.map((e, i) => {
          return (
            <li key={i}>
              {e.quantity}x {e.product}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
