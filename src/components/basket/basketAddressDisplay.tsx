interface BasketAddressDisplayProps extends React.HTMLProps<HTMLDivElement> {
  address: string;
  postal_code: string;
  city: string;
}

export function BasketAddressDisplay({
  address,
  postal_code,
  city,
  ...props
}: BasketAddressDisplayProps) {
  return (
    <div {...props}>
      <div>{address}</div>
      <div>{`${postal_code} ${city}`}</div>
    </div>
  );
}
