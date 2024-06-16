import { FC, FormEvent } from 'react';
import label from 'src/shared/label';
import { products as TProduct } from '@prisma/client';
import { useRouter } from 'next/router';

type TFormProps = {
  product?: TProduct;
  path: string;
  method?: string;
};

const ProductForm: FC<TFormProps> = ({ product, path, method = 'POST' }) => {
  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = {} as TProduct;
      for (const entry of formData.entries()) data[entry[0]] = entry[1];
      data.quantity = +data.quantity;

      await fetch(path, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">{`${label('Name')}`}</label>
          <input
            type="text"
            name="name"
            defaultValue={product?.name}
            placeholder={`${label('Name')}`}
            minLength={5}
            maxLength={120}
            required
          />
        </div>
        <div>
          <label htmlFor="description">{`${label('Description')}`}</label>
          <textarea
            name="description"
            rows={4}
            cols={50}
            defaultValue={product?.description}
            minLength={5}
            maxLength={400}
            required
          />
        </div>
        <div>
          <label htmlFor="price">{`${label('Price')}`}</label>
          <input
            type="number"
            name="price"
            defaultValue={product?.price.toString()}
            minLength={1}
            maxLength={5}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">{`${label('Quantity')}`}</label>
          <input
            type="number"
            name="quantity"
            defaultValue={product?.quantity}
            minLength={1}
            maxLength={5}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
