import Account from './account/account';
import History from './history/history';
import Sessions from './sessions/sessions';

function Settings() {
  return (
    <div className="grid  chat-bg-animation-gradient grid-cols-12 grid-rows-6 gap-0 fixed-height">
      <div className="col-span-8 row-span-3 ">
        <Account />
      </div>
      <div className="col-span-8 row-span-3 col-start-1 row-start-4">
        <History />
      </div>
      <div className="col-span-4 row-span-6 col-start-9 row-start-1">
        <Sessions />
      </div>
    </div>

    // <div className=" container-fluid h-full mx-auto w-full">
    //   <div className="grid grid-cols-12 grid-rows-12 xl:grid-rows-6 gap-5 h-full">
    //     <div className="rounded-lg sm:rounded-2xl col-span-12 xl:col-span-8 row-span-3 xl:row-span-6 ">
    //       <div className="mb-5">
    //         <Account />
    //       </div>
    //       <div className="h-80">
    //         <History />
    //       </div>
    //     </div>
    //     <div className="rounded-lg sm:rounded-2xl col-span-12 xl:col-span-4 row-span-3 xl:row-span-6 xl:col-start-9 xl:row-start-1 ">
    //       {' '}
    //       <Sessions />
    //     </div>
    //   </div>
    // </div>
  );
}

export default Settings;
