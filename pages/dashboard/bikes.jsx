import AddBike from '@/components/AddBike';
import ButtonG from '@/components/ButtonG';
import DashboardNav from '@/components/DashboardNav';
import ImageG from '@/components/ImageG';
import UpdateBike from '@/components/UpdateBike';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import Private from '@/layouts/Private';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const Bikes = () => {
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);

    const [bikes, setBikes] = useState([]);
    const [addForm, setAddForm] = useState(false);
    const [updateFrom, setUpdateForm] = useState(false);
    const [toUpdate, setToUpdate] = useState(null);

    const FetchAllBikes = async () => {
        setLoading(true);
        try {
            const { username } = user;
            const API = `${process.env.BASE_URL}/api/bikes?username=${username}`;
            const response = await axios.get(API);
            if (response.status === 200) {
                if (response.data.result.length) {
                    setMessage({
                        type: true,
                        message: 'Bike data fetch successful!',
                    });
                    setBikes(response.data.result);
                } else {
                    setMessage({
                        type: false,
                        message: 'No bike data found!',
                    });
                }
            }
        } catch (error) {
            setMessage({
                type: false,
                message: 'Something went wrong!',
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/bikes');
        FetchAllBikes();
    }, []);

    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div className='col-span-8 lg:col-span-9'>
                    {addForm ? (
                        <AddBike
                            setAddForm={setAddForm}
                            bikes={bikes}
                            setBikes={setBikes}
                        />
                    ) : null}
                    {updateFrom ? (
                        <UpdateBike
                            setUpdateForm={setUpdateForm}
                            bikes={bikes}
                            setBikes={setBikes}
                            toUpdate={toUpdate}
                        />
                    ) : null}
                    <h1 className='mb-5 text-xl font-bold lg:text-2xl'>
                        Bikes
                    </h1>
                    <ButtonG
                        text='Add new Bike'
                        color='primary'
                        func={() => setAddForm(true)}
                    />

                    <div className='my-5 grid grid-cols-1 gap-4 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {bikes.length
                            ? bikes.map((bike, index) => {
                                  const {
                                      id,
                                      thumbnail,
                                      images,
                                      name,
                                      description,
                                  } = bike;
                                  const otherImages = JSON.parse(images);
                                  return (
                                      <div
                                          key={index}
                                          className='rounded-xl bg-white p-5 shadow-xl'
                                      >
                                          <div className='h-[200px] w-full overflow-hidden rounded-xl'>
                                              <ImageG src={thumbnail} />
                                          </div>
                                          <div className='my-2 flex items-center justify-start gap-1 flex-wrap'>
                                              {otherImages.length
                                                  ? otherImages.map(
                                                        (image, index) => {
                                                            return (
                                                                <img
                                                                    key={index}
                                                                    src={image}
                                                                    al='images'
                                                                    className='h-[50px] w-[50px] rounded-lg'
                                                                />
                                                            );
                                                        }
                                                    )
                                                  : null}
                                          </div>
                                          <div className='my-5'>
                                              <h1 className='text-xl font-bold'>
                                                  {name}
                                              </h1>
                                              <p className='text-gray-400'>
                                                  {description}
                                              </p>
                                          </div>
                                          {/* <div className='mt-5 flex items-center justify-between gap-2 rounded-2xl border p-2'>
                                              <ButtonG
                                                  text='Update'
                                                  color='primary'
                                                  func={() => {
                                                      setToUpdate(id);
                                                      setUpdateForm(true);
                                                  }}
                                              />
                                              <ButtonG
                                                  text='Delete'
                                                  color='error'
                                              />
                                          </div> */}
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </Private>
    );
};

export default Bikes;
