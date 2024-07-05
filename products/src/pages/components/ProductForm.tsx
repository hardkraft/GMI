import { FC, FormEvent, useState } from 'react';
import label from 'src/shared/label';
import { products as TProduct, Prisma } from '@prisma/client';
import { useRouter } from 'next/router';
import { Box, Button, TextField } from '@mui/material';

type TFormProps = {
  product?: TProduct;
  path: string;
  method?: string;
};

const ProductForm: FC<TFormProps> = ({ product, path, method = 'POST' }) => {
  const router = useRouter();
  const [error, setError] = useState<string>(null);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = {} as TProduct;
      for (const entry of formData.entries()) data[entry[0]] = entry[1];
      data.quantity = +data.quantity;
      data.price = new Prisma.Decimal(+data.price);

      const res = await fetch(path, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resBody = await res.json();
      console.log(1, resBody);
      if (resBody.path === '/error') setError(resBody.error);
      else router.push(resBody.path);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Box
      component="form"
      action="/"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
      onSubmit={onSubmit}
    >
      <div>
        <TextField
          id="name"
          label={`${label('Name')}`}
          variant="outlined"
          type="text"
          name="name"
          defaultValue={product?.name}
          placeholder={`${label('Name')}`}
          autoFocus
          inputProps={{ minLength: 5, maxLength: 120 }}
          required
        />
      </div>
      <div>
        <TextField
          name="description"
          label={`${label('Description')}`}
          defaultValue={product?.description}
          inputProps={{ minLength: 5, maxLength: 400, cols: 20 }}
          multiline
          rows={8}
          required
        />
      </div>
      <div>
        <TextField
          id="price"
          label={`${label('Price')}`}
          variant="outlined"
          name="price"
          defaultValue={product?.price.toString()}
          placeholder={`${label('Price')}`}
          inputProps={{ minLength: 1, maxLength: 8 }}
          required
        />
      </div>
      <div>
        <TextField
          id="quantity"
          label={`${label('Quantity')}`}
          variant="outlined"
          type="number"
          name="quantity"
          defaultValue={product?.quantity.toString()}
          placeholder={`${label('Quantity')}`}
          inputProps={{ min: 0, max: 1000000 }}
          required
        />
      </div>

      <Button variant="contained" type="submit" sx={{ mt: 4 }}>
        Save
      </Button>
      {error && (
        <Box
          typography="body2"
          sx={{ whiteSpace: 'pre-wrap', color: 'darkred' }}
        >{`\n\nSomething went wrong \n\n${error.replaceAll(',', ',\n')}`}</Box>
      )}
    </Box>
  );
};

export default ProductForm;
