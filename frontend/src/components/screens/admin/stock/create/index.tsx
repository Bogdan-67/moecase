import AdminLayout from '@/components/AdminLayout';
import { IStock } from '@/models/IStock';
import { useCreateStockMutation } from '@/redux/services/stock';
import React, { ChangeEvent, useState } from 'react';

type Props = {};

const CreateStock = (props: Props) => {
  const [inputData, setInputData] = useState<any>({});
  const [createStock, { isLoading, error }] = useCreateStockMutation();

  let formData = new FormData();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      formData.append('logo', e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    for (let key in inputData) {
      formData.append(key, inputData[key]);
    }
    console.log(formData);
    createStock(formData).then(() => {
      console.log('sended');
    });
  };

  return (
    <AdminLayout title='Создание предмета'>
      {isLoading && <div>Loading</div>}
      {error && <div>error</div>}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '20px',
          color: 'black',
        }}>
        <input
          placeholder='ticker'
          value={inputData.ticker}
          onChange={(e) => setInputData({ ...inputData, ticker: e.target.value })}
        />
        <input
          placeholder='color'
          value={inputData.color}
          onChange={(e) => setInputData({ ...inputData, color: e.target.value })}
        />
        <input
          placeholder='name'
          value={inputData.name}
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
        />
        <input
          placeholder='description'
          value={inputData.description}
          onChange={(e) => setInputData({ ...inputData, description: e.target.value })}
        />
        <input placeholder='logo' type='file' onChange={handleFile} />

        <button type='submit' disabled={!inputData}>
          Создать
        </button>
      </form>
    </AdminLayout>
  );
};

export default CreateStock;
