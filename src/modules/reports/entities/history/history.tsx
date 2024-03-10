import React, { useState } from 'react';
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Spinner,
  CardHeader,
  CardBody
} from '@nextui-org/react';
import { useAsyncList } from '@react-stately/data';
import { PaymentService } from '@/services/payment-services/payment-services';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ITransactionsItem } from '../../../cabinet/types';

export default function History() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const list = useAsyncList<ITransactionsItem>({
    async load({ cursor }) {
      setIsLoading(true);
      try {
        // Convert the cursor to a number, defaulting to 1 if it's not available
        const page: number = cursor ? parseInt(cursor, 10) : 1;
        const res = await PaymentService.getInstance().getTransactions([
          { name: 'page', value: page },
          { name: 'pageSize', value: 10 }
        ]);
        setIsLoading(false);

        return {
          items: res.data.pagedData,
          // Convert the new cursor value back to a string
          cursor: (page + 1).toString()
        };
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        return { items: [] };
      }
    }
  });

  return (
    <Card className=" relative bg-transparent !shadow-none !rounded-none containerLg">
      <CardHeader className="flex my-3 bg-default-50 rounded-md justify-between min-h-[48px] sm:min-h-[56px]  p-3 ">
        <div className="text-base sm:text-xl text-white flex flex-row gap-1 sm:gap-0 font-semibold">
          <p>{t('paymentHistory')}</p>
        </div>
      </CardHeader>
      <CardBody className=" flex my-3 bg-default-50 rounded-md justify-between min-h-[48px] sm:min-h-[56px]  p-2">
        <Table
          isHeaderSticky
          aria-label="Transactions table"
          className="remove-scrollbar !border-none  !rounded-none overflow-x-scroll shadow-none overflow-y-hidden"
          classNames={{
            wrapper: '!border-none  !rounded-none shadow-none',
            base: ' overflow-scroll remove-scrollbar',
            table: 'min-h-[120px]'
          }}
          bottomContent={
            list.items.length > 0 && (
              <div className="flex justify-center my-4">
                <Button onClick={() => list.loadMore()} disabled={isLoading}>
                  {t('loadMore')}
                </Button>
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn>{t('operationCode').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('amount').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('operationDate').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('status').toLocaleUpperCase()}</TableColumn>
          </TableHeader>
          <TableBody
            items={list.items}
            isLoading={isLoading}
            loadingContent={<Spinner />}
          >
            {item => (
              <TableRow key={item?.id}>
                <TableCell>{item?.orderId}</TableCell>
                <TableCell>{item?.amount} AZN</TableCell>
                <TableCell>
                  {' '}
                  {dayjs.utc(item?.transactionDate).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell>
                  {' '}
                  <Chip
                    className="text-white"
                    color="success"
                    aria-label={`Status: ${item?.status}`}
                  >
                    {t('active')}
                  </Chip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
