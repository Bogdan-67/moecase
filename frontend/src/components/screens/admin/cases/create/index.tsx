import AdminLayout from '@/components/AdminLayout';
import { IGroup } from '@/models/IGroup';
import React, { FC, useState } from 'react';
import styles from './CreateCase.module.scss';
import Modal from '@/components/Modal';
import { IStock } from '@/models/IStock';
import { API_URL } from '@/http';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa6';
import * as yup from 'yup';
import Select from 'react-select';
// Import Field component:
import { Field } from '@/components/Form/Field';
import SelectBar from '@/components/SelectBar';
import classNames from 'classnames';
import { useCreateCaseMutation } from '@/redux/services/case';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

type Props = {
  groups: IGroup[];
  stocks: IStock[];
};

const formSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  website: yup.string().url().required(),
});

export interface Option {
  label: string;
  value: number | string;
}

const CreateCase: FC<Props> = ({ groups, stocks }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedStocks, setSelectedStocks] = useState<IStock[]>([]);
  const [caseName, setCaseName] = useState<string>('');
  const [casePrice, setCasePrice] = useState<string>('');
  const [caseSalePrice, setCaseSalePrice] = useState<string>('');
  const [caseGroup, setCaseGroup] = useState<Option | null>(null);
  const [values, setValues] = useState({
    caseName: '',
    casePrice: '',
  });
  const [errors, setErrors] = useState({
    caseName: '',
    casePrice: '',
  });

  const groupOptions = groups.map((group) => {
    return {
      label: group.name,
      value: group.id_group,
    };
  });

  const [createCase, { isLoading, error }] = useCreateCaseMutation();

  const stockClick = (stock: IStock) => {
    if (!selectedStocks.includes(stock)) setSelectedStocks([...selectedStocks, stock]);
    else setSelectedStocks(selectedStocks.filter((item) => item !== stock));
  };

  const handleClose = () => {
    setIsActive(false);
  };

  const handleCreate = () => {
    if (caseName && casePrice && caseGroup && selectedStocks.length !== 0) {
      createCase({
        name: caseName,
        price: +casePrice,
        sale_price: caseSalePrice ? caseSalePrice : null,
        group_id: caseGroup.value,
        items: selectedStocks.map((stock) => stock.id_stock),
      });

      setCaseName('');
      setCaseGroup(null);
      setCasePrice('');
      setCaseSalePrice('');
      setSelectedStocks([]);
    }
  };

  return (
    <AdminLayout title='Создание кейса'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.form}>
          <div className={styles.form__inputs}>
            <div className={styles.form__inputs__block}>
              <label>Название:</label>
              <input
                value={caseName}
                onChange={(e) => setCaseName(e.target.value)}
                placeholder='Название'
              />
            </div>
            <div className={styles.form__inputs__block}>
              <label>Цена:</label>
              <input
                value={casePrice}
                onChange={(e) => setCasePrice(e.target.value)}
                placeholder='Цена'
              />
            </div>
            <div className={styles.form__inputs__block}>
              <label>Цена со скидкой:</label>
              <input
                value={caseSalePrice}
                onChange={(e) => setCaseSalePrice(e.target.value)}
                placeholder='Цена со скидкой'
              />
            </div>
            <div
              className={classNames(styles.form__inputs__block, styles.form__inputs__block_select)}>
              <label>Группа:</label>
              <SelectBar
                setSelected={setCaseGroup}
                placeholder='Группа'
                emptyMessage='Группа не найдена'
                options={groupOptions}
              />
            </div>
          </div>
          <div className={styles.form__stocks}>
            <div className={styles.form__stocks__bar}>
              <label className={styles.form__stocks__bar__title}>Предметы:</label>
              <span className={styles.form__stocks__bar__add} onClick={() => setIsActive(true)}>
                +
              </span>
            </div>
            <div className={styles.form__stocks__items}>
              {selectedStocks.map((stock) => (
                <div
                  key={stock.id_stock}
                  className={styles.modal__stocks__item}
                  onClick={() => stockClick(stock)}>
                  <div className={styles.modal__stocks__item__image}>
                    <Image
                      src={API_URL + stock.logo}
                      alt={stock.name}
                      objectFit='cover'
                      fill={true}
                    />
                  </div>
                  <div className={styles.modal__stocks__item__content}>
                    <h6 title={stock.name}>{stock.name}</h6>
                    <small>Цена: {stock.price} ₽</small>
                  </div>
                  {selectedStocks.includes(stock) && (
                    <span className={styles.checked}>
                      <FaCheck />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {error && <div>{error.data.message ? error.data.message : 'error'}</div>}
          <button
            onClick={() => handleCreate()}
            className={styles.form__create}
            disabled={!caseName || !casePrice}>
            Создать
          </button>
        </div>
      )}

      <Modal isActive={isActive} setIsActive={setIsActive}>
        <div className={styles.modal}>
          <h1 className={styles.modal__title}>Нажмите для выбора</h1>
          <div className={styles.modal__stocks}>
            {stocks?.map((stock) => (
              <div
                key={stock.id_stock}
                className={styles.modal__stocks__item}
                onClick={() => stockClick(stock)}>
                <div className={styles.modal__stocks__item__image}>
                  <Image
                    src={API_URL + stock.logo}
                    alt={stock.name}
                    objectFit='cover'
                    fill={true}
                  />
                </div>
                <div className={styles.modal__stocks__item__content}>
                  <h6 title={stock.name}>{stock.name}</h6>
                  <small>Цена: {stock.price} ₽</small>
                </div>
                {selectedStocks.includes(stock) && (
                  <span className={styles.checked}>
                    <FaCheck />
                  </span>
                )}
              </div>
            ))}
          </div>
          <button className={styles.modal__button} onClick={() => handleClose()}>
            Добавить
          </button>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default CreateCase;
