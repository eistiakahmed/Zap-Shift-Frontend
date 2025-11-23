import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  // console.log(user?.email);

  const navigate = useNavigate()

  const serviceCenter = useLoaderData();
  const regionsDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // set convert korla ekta jinis ber ber duplicate hbe nah
  // console.log(regions)
  const senderRegion = useWatch({ control, name: 'senderRegions' });
  const receiverRegion = useWatch({ control, name: 'receiverRegions' });

  const districtsByRegions = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    // console.log(regionDistricts);
    const districts = regionDistricts.map((d) => d.district);
    // console.log(districts)
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    console.log('cost', cost);
    data.cost = cost;

    Swal.fire({
      title: 'Agree with the Cost?',
      text: `You will be Charged ${cost} taka!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm and Continue Payment',
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the data base
        axiosSecure
          .post('/parcels', data)
          .then((res) => {
            console.log('after saving parcel', res.data);
            if (res.data.insertedId) {
              navigate('/dashboard/my-parcels');
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Parcel has created. Please Pay',
                showConfirmButton: false,
                timer: 2500,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="my-20 shadow-lg bg-white rounded-3xl p-12">
      <h1 className="text-4xl font-extrabold mb-3">Send A Parcel</h1>
      <p className="text-lg text-gray-700 mb-8">
        Enter your parcel information below
      </p>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="border-t pt-6 border-gray-300"
      >
        {/* Document Type */}
        <div className="flex gap-6 font-medium text-black mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              {...register('parcelType')}
              value="document"
              className="radio radio-success"
              defaultChecked
            />
            <span>Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              {...register('parcelType')}
              value="non-document"
              className="radio radio-success"
            />
            <span>Non-Document</span>
          </label>
        </div>

        {/* Parcel Name & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-8 border-b border-gray-300">
          <fieldset className="fieldset">
            <label className="label text-black text-sm font-bold">
              Parcel Name
            </label>
            <input
              type="text"
              {...register('parcelName')}
              className="input input-bordered w-full"
              placeholder="Parcel Name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label text-black text-sm font-bold">
              Parcel Weight (KG)
            </label>
            <input
              type="number"
              {...register('parcelWeight')}
              className="input input-bordered w-full"
              placeholder="Parcel Weight (KG)"
            />
          </fieldset>
        </div>

        {/* Sender + Receiver Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender */}
          <div>
            <h4 className="text-3xl font-extrabold mb-4">Sender Details</h4>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Sender Name
              </label>
              <input
                type="text"
                {...register('senderName')}
                className="input input-bordered w-full"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Sender Email
              </label>
              <input
                type="email"
                {...register('senderEmail')}
                className="input input-bordered w-full"
                defaultValue={user?.email}
                placeholder="Sender Email"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Sender Phone No
              </label>
              <input
                type="text"
                {...register('senderPhoneNo')}
                className="input input-bordered w-full"
                placeholder="Sender Phone No"
              />
            </fieldset>

            {/* Sender Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold text-sm">
                Sender Regions
              </legend>
              <select
                {...register('senderRegions')}
                defaultValue="Pick a Regions"
                className="select w-full"
              >
                <option disabled={true}>Pick a Regions</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Sender Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold text-sm">
                Sender Districts
              </legend>
              <select
                {...register('senderDistrict')}
                defaultValue="Pick a Districts"
                className="select w-full"
              >
                <option disabled={true}>Pick a Districts</option>
                {districtsByRegions(senderRegion).map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Sender Address
              </label>
              <input
                type="text"
                {...register('senderAddress')}
                className="input input-bordered w-full"
                placeholder="Sender Address"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Pickup Instruction
              </label>
              <textarea
                {...register('pickupInstruction')}
                rows="4"
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instruction"
              />
            </fieldset>
          </div>

          {/* Receiver */}
          <div>
            <h4 className="text-3xl font-extrabold mb-4">Receiver Details</h4>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Receiver Name
              </label>
              <input
                type="text"
                {...register('receiverName')}
                className="input input-bordered w-full"
                placeholder="Receiver Name"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Receiver Email
              </label>
              <input
                type="email"
                {...register('receiverEmail')}
                className="input input-bordered w-full"
                placeholder="Receiver Email"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Receiver Phone No
              </label>
              <input
                type="text"
                {...register('receiverPhoneNo')}
                className="input input-bordered w-full"
                placeholder="Receiver Phone No"
              />
            </fieldset>

            {/* Receiver Regions */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold text-sm">
                Receiver Regions
              </legend>
              <select
                {...register('receiverRegions')}
                defaultValue="Pick a Regions"
                className="select w-full"
              >
                <option disabled={true}>Pick a Regions</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold text-sm">
                Receiver District
              </legend>
              <select
                {...register('receiverDistrict')}
                defaultValue="Pick a District"
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegions(receiverRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Receiver Address
              </label>
              <input
                type="text"
                {...register('receiverAddress')}
                className="input input-bordered w-full"
                placeholder="Receiver Address"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label font-bold text-black text-sm">
                Delivery Instruction
              </label>
              <textarea
                {...register('deliveryInstruction')}
                rows="4"
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instruction"
              />
            </fieldset>
          </div>
        </div>

        <p className="mt-6 text-gray-700 font-medium">
          <strong>* Pick-up Time: 4 PM – 7 PM Approx.</strong>
        </p>

        <button
          type="submit"
          className="btn bg-lime-300 hover:bg-lime-500 rounded-2xl mt-6 text-black text-lg"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
