import React, { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { Calendar } from "@/components/ui/calendar";
import ChatBot from '@/components/ChatBot';
import { User } from '@/types';

interface LandingProps {
  user: User;
}

const Landing: React.FC<LandingProps> = ({ user }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const firstName = user.name.split(' ')[0];

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <header>
        <Header user={user} />
      </header>
      <div className='flex flex-1'>
        <Nav user={user} />
        <main className='flex-1 p-8'>
          {/* Hospital Image */}
          <section className="flex-1">
            <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg">
              <img
                alt="Hospital building with large H sign on top and blue sky background"
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/a1aa/image/41497483-f7c9-4f44-7ffa-e8453b47f693.jpg"
                width={1800}
                height={160}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent"></div>
            </div>

            {/* Hello name */}
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Good Day, <span className="text-blue-600">{firstName}</span>!
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                We're here to help you stay healthy—check in regularly to stay up to date on your health and care plan.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Calendar, Health Tip, and Upcoming Appointments in a row */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Calendar */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Schedule</h2>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-xl border shadow-sm
                        [&_.day]:transition-all
                        [&_.day]:rounded-full
                        [&_.day]:h-12 [&_.day]:w-12
                        [&_.day:hover]:bg-blue-50
                        [&_.day:hover]:text-blue-600
                        [&_.day[aria-selected='true']]:bg-blue-50
                        [&_.day[aria-selected='true']]:text-blue-600
                        [&_.day[aria-selected='true']]:shadow-md
                        [&_.day[aria-selected='true']]:hover:bg-blue-100
                        [&_.day[aria-selected='true']]:hover:text-blue-700
                        [&_.rdp-nav_button]:rounded-full
                        [&_.rdp-nav_button]:hover:bg-blue-50
                        [&_.rdp-nav_button]:hover:text-blue-600
                        [&_.rdp-nav_button]:transition-all
                        [&_.rdp-nav_button]:shadow-sm"
                    />
                  </div>
                  {/* Health Tip */}
                  <div className="bg-blue-50 rounded-2xl shadow-lg p-8 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold text-blue-900 mb-2">Health Tip</h2>
                    <p className="text-blue-800">Drink at least 8 glasses of water a day to stay hydrated!</p>
                  </div>
                  {/* Upcoming Appointments */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Appointments</h2>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>May 20, 2025</span>
                        <span className="text-blue-600 font-medium">Checkup</span>
                      </li>
                      <li className="flex justify-between">
                        <span>May 25, 2025</span>
                        <span className="text-blue-600 font-medium">Lab Test</span>
                      </li>
                      <li className="flex justify-between">
                        <span>June 2, 2025</span>
                        <span className="text-blue-600 font-medium">Consultation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements & Hotlines at the bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Announcements */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <i className="fas fa-bullhorn text-blue-600 text-lg"></i>
                  <h2 className="text-xl font-semibold text-gray-900">Announcements</h2>
                </div>
                <div className="text-gray-600">
                  <p className="mb-1">No Announcements</p>
                  <p className="text-sm">Please await further instructions</p>
                </div>
              </div>
              {/* Emergency Hotlines */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Hotlines</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">NURSE STATION 1</p>
                    <p className="text-blue-600">(51) 472-4025</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">NURSE STATION 4</p>
                    <p className="text-blue-600">(54) 472-4025</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">NURSE STATION 2</p>
                    <p className="text-blue-600">(53) 475-0000</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">NURSE STATION 5</p>
                    <p className="text-blue-600">(59) 852-4125</p>
                  </div>
                  <div className="col-span-2 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">NURSE STATION 3</p>
                    <p className="text-blue-600">(052) 871-33-77</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <ChatBot />
    </div>
  );
};

export default Landing;
