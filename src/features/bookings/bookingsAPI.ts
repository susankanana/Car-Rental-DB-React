import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

export type TBooking = {
  bookingID: number;
  carID: number;
  customerID: number;
  rentalStartDate: string; // ISO format
  rentalEndDate: string;   // ISO format
  totalAmount: string;     // Decimal comes as string from DB
};

export const bookingAPI = createApi({
  reducerPath: "bookingAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({

    createBooking: builder.mutation<TBooking, Partial<TBooking>>({
      query: (newBooking) => ({
        url: "/booking/register",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Bookings"],
    }),

    getAllBookings: builder.query<TBooking[], void>({
      query: () => "/bookings",
      transformResponse: (response: { data: TBooking[] }) => response.data,
      providesTags: ["Bookings"],
    }),

    getBookingById: builder.query<TBooking, number>({
      query: (id) => `/booking/${id}`,
      transformResponse: (response: { data: TBooking }) => response.data,
      providesTags: ["Bookings"],
    }),

    getBookingsByCustomerId: builder.query<TBooking[], number>({
  query: (customerID) => `/bookings/customer/${customerID}`,
  transformResponse: (response: { data: TBooking[] }) => {
    console.log("Raw API response:", response); // ✅ Now inside the function body
    return response.data;
  },
  providesTags: ["Bookings"],
}),


    updateBooking: builder.mutation<TBooking, Partial<TBooking> & { bookingID: number }>({
      query: ({ bookingID, ...rest }) => ({
        url: `/booking/${bookingID}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Bookings"],
    }),

    deleteBooking: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});
