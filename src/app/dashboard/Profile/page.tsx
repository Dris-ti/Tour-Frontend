'use client';
import axios from 'axios';
import { InputField } from './InputField';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';


import '@fontsource/inter';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';

export default function Profile() {
  const [nid, setNID] = useState("");
  const [name, setName] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Controls edit mode

  const route = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [old, setOld] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cnPass, setCNPass] = useState('');

  const [oldpassErr, setOldPassErr] = useState<string | null>(null);
  const [newpassErr, setNewPassErr] = useState<string | null>(null);



  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/showAdminProfile', { withCredentials: true });
        if (response.status === 200) {
          setNID(response.data.nid_no);
          setName(response.data.name);
          setPhone_no(response.data.phone_no);
          setDate(response.data.dob.split('T')[0]); // Extracts YYYY-MM-DD format
          setAddress(response.data.address);
          setGender(response.data.gender);
        }
      } catch (error) {
        alert("Failed to fetch profile data. Please try again.");
      }
    };

    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.patch('http://localhost:3000/admin/editAdminProfile', {
        name,
        phone_no,
        dob: date,
        address,
        gender,
      }, { withCredentials: true });

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false); // Disable editing mode after saving
      }
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  const generatePassword = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    let password = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
      const char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }
    setNewPass(password);
    setCNPass(password);
  };

  const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPass !== cnPass) {
      setNewPassErr("New password and confirm password do not match.");
    }

    try {
      const response = await axios.post('http://localhost:3000/authentication/changePassword', {
        oldPassword: old,
        newPassword: newPass,
      }, { withCredentials: true });

      if (response.status === 201) {
        alert("Password changed successfully!");
        setOpen(false);
        setOld('');
        setNewPass('');
        setCNPass('');
      }
    } catch (error) {
      alert("Failed to change password. Please try again.");
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <div>
          <img className="w-40 h-40 p-1 m-5 left-20 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src="/docs/images/people/profile-picture-5.jpg" alt="Profile" />
        </div>

        <div className='bg-primarycolor p-4 rounded-full w-full h-20 font-bold text-white text-end text-3xl'>
          <p>{name}</p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center px-10 pt-8 pb-16 mb-0 bg-white rounded-[25px] shadow-[0px_0px_10px_rgba(89,195,195,1)] w-[70vw] max-md:w-full max-md:px-4 space-x-4">
            <div>
              <InputField label="Name" type="text" id="Name" value={name} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)} disabled={!isEditing} />
              <InputField label="Phone No" type="text" id="Phone_no" value={phone_no} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhone_no(e.target.value)} disabled={!isEditing} />
              <InputField label="NID" type="text" id="nid_no" value={nid} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNID(e.target.value)} disabled={!isEditing} />
            </div>

            <div>
              <InputField label="Date of Birth" type="date" id="date" value={date} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDate(e.target.value)} disabled={!isEditing} />
              <InputField label="Gender" type="text" id="gender" value={gender} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setGender(e.target.value)} disabled={!isEditing} />
              <InputField label="Address" type="text" id="address" value={address} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setAddress(e.target.value)} disabled={!isEditing} />
            </div>
          </div>

          <div>
            <button type="button" className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 transition-colors duration-200"
              onClick={() => setOpen(true)}>
              Change Password
            </button>

            <button
              type="button"
              className="px-14 py-1 mt-10 ml-4 text-2xl focus:outline-none text-white bg-green-900 rounded-3xl tracking-[2px] hover:bg-teal-400 transition-colors duration-200"
              onClick={(e) => isEditing ? handleSubmit(e as React.FormEvent) : setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                type="button"
                className="px-14 py-1 mt-10 text-2xl focus:outline-none text-white bg-red-600 rounded-3xl tracking-[2px] hover:bg-red-400 transition-colors duration-200"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>





      <Modal open={open} onClose={() => {
        setOpen(false);
        setOld('');
        setNewPass('');
        setCNPass('');
      }}>
        <ModalDialog>
          <DialogTitle>Change Password</DialogTitle>
          <form onSubmit={changePassword}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Old Password</FormLabel>
                <Input
                  autoFocus
                  required
                  value={old}
                  type='password'
                  onChange={(e) => setOld(e.target.value)}
                />
                {oldpassErr && <small className="text-red-500">{oldpassErr}</small>}

              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  required
                  value={newPass}
                  type='text'
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <a
                  onClick={(e) => generatePassword(e)}
                  className="w-fit text-xs absolute right-0 pt-1 pr-1 hover:text-primarycolor"
                  href="#"
                >
                  Generate Password
                </a>
              </FormControl>

              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  autoFocus
                  required
                  value={cnPass}
                  type='text'
                  onChange={(e) => setCNPass(e.target.value)}
                />
                {newpassErr && <small className="text-red-500">{newpassErr}</small>}
              </FormControl>

              <Button type="submit">Save</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

    </div>
  );
}
