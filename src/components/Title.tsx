interface TitleProps {
  title: string;
  subtitle: string;
}

export function Title({ title, subtitle }: TitleProps) {
  return (
    <div>
      <h2 className="font-bold text-[25px] small:text-4xl ">{title}</h2>
      <p className="text-[#828282] text-[16px] small:text-[18px] ">
        {subtitle}
      </p>
    </div>
  );
}
