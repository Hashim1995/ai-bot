/* eslint-disable jsx-a11y/anchor-is-valid */
import { Listbox, ListboxItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { BsEnvelope, BsMailbox } from 'react-icons/bs';
import { FaMoneyBill } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full max-w-[260px]  py-2 rounded-small ">
        <Listbox variant="flat" aria-label="Listbox menu with descriptions">
          <ListboxItem
            onClick={() => {
              navigate('/settings');
            }}
            key={1}
            className="bg-default-100 rounded-lg p-3 mb-2"
            startContent={<BsMailbox />}
          >
            {t('smtpSettings')}
          </ListboxItem>
          <ListboxItem
            onClick={() => {
              navigate('/settings/email');
            }}
            key={3}
            className="bg-default-100 rounded-lg p-3 mb-2"
            startContent={<BsEnvelope />}
          >
            {t('emailSettings')}
          </ListboxItem>
          <ListboxItem
            onClick={() => {
              navigate('/settings/payment-history');
            }}
            key={2}
            className="bg-default-100 rounded-lg p-3 mb-2"
            startContent={<FaMoneyBill />}
          >
            {t('paymentHistory')}
          </ListboxItem>
          {/* <ListboxItem
            key="copy"
            onClick={() => {
              navigate('/settings/test2');
            }}
            description="test 2"
            startContent={<Bs0SquareFill />}
          >
            Test2
          </ListboxItem>
          <ListboxItem
            key="edit"
            showDivider
            description="Allows you to edit the file"
            startContent={<Bs6SquareFill />}
          >
            Edit file
          </ListboxItem>
          <ListboxItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the file"
            startContent={<BsFillTrashFill />}
          >
            Delete file
          </ListboxItem> */}
        </Listbox>
      </div>
    </div>
  );
}

export default Sidebar;
