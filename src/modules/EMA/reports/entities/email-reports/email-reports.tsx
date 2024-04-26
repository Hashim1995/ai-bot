/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
  CardHeader,
  CardBody,
  useDisclosure
} from '@nextui-org/react';
import utc from 'dayjs/plugin/utc'; // Import the UTC plugin

import { useAsyncList } from '@react-stately/data';
import { EmaReportsServices } from '@/services/ema/ema-reports-services';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsEye } from 'react-icons/bs';
import { IEmailReportItem } from './types';
import ViewEmailReportModal from './view-email-reports';

dayjs.extend(utc); // Use the UTC plugin

/**
 * @description Renders the email reports. This component displays the user's email reports.
 * @returns The rendered email reports.
 */
export default function Email() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IEmailReportItem>();

  /**
   * @description Loads the user's email reports.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   * @returns The user's email reports.
   */
  const list = useAsyncList<IEmailReportItem>({
    async load({ cursor }) {
      setIsLoading(true);
      try {
        const page: number = cursor ? parseInt(cursor, 10) : 1;
        const res = await EmaReportsServices.getInstance().getEmailReports([
          { name: 'page', value: page },
          { name: 'pageSize', value: 10 }
        ]);
        setIsLoading(false);

        return {
          items: res.data.pagedData,
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
    <Card className="relative bg-transparent !shadow-none !rounded-none containerLg">
      {/* Card Header */}
      <CardHeader className="flex justify-between bg-default-50 my-3 p-3 rounded-md min-h-[48px] sm:min-h-[56px]">
        <div className="flex flex-row gap-1 sm:gap-0 font-semibold text-base text-default-800 sm:text-xl dark:text-white">
          <p>{t('emailReports')}</p>
        </div>
      </CardHeader>
      {/* Table */}
      <CardBody className="flex justify-between bg-default-50 my-3 p-2 rounded-md min-h-[48px] sm:min-h-[56px]">
        <Table
          isHeaderSticky
          aria-label="Transactions table"
          className="shadow-none !border-none !rounded-none overflow-x-scroll overflow-y-hidden remove-scrollbar"
          classNames={{
            wrapper: '!border-none  !rounded-none shadow-none',
            base: ' overflow-scroll remove-scrollbar',
            table: 'min-h-[120px]'
          }}
          bottomContent={
            list.items.length > 0 && (
              <div className="flex justify-center my-4">
                <Button
                  title="Load More"
                  aria-label="Load More"
                  onClick={() => list.loadMore()}
                  disabled={isLoading}
                >
                  {t('loadMore')}
                </Button>
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn>{t('emailAddress').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('emailTitle').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('createdAt').toLocaleUpperCase()}</TableColumn>
            <TableColumn className="flex justify-end items-center">
              <IoEllipsisVertical />{' '}
            </TableColumn>
          </TableHeader>
          <TableBody
            items={list.items}
            isLoading={isLoading}
            loadingContent={<Spinner />}
          >
            {item => (
              <TableRow key={item?.id}>
                <TableCell>{item?.emailAddress}</TableCell>
                <TableCell>{item?.emailTitle}</TableCell>
                <TableCell>
                  {dayjs.utc(item?.createdAt).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setSelectedItem(item);
                    onOpen();
                  }}
                  className="cursor-pointer"
                >
                  <BsEye />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>

      {/**
       * @description Renders the ViewEmailReportModal component.
       * @returns The rendered ViewEmailReportModal component.
       * @param selectedItem The selected email report item.
       * @param onOpenChange The function to change the modal's open state.
       * @param isOpen The modal's open state.
       */}
      {isOpen && (
        <ViewEmailReportModal
          selectedItem={selectedItem}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
    </Card>
  );
}
