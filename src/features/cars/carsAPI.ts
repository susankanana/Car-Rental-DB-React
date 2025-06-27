import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

export type TCar = {
    carID: number;
    carModel: string;
    year: string; // ISO string (e.g., "2025-06-24")
    color?: string;
    rentalRate: string; // because decimal is returned as string from DB
    availability: boolean;
    locationID?: number | null;
};


export const carAPI = createApi({
    reducerPath: "carAPI",
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
    tagTypes: ["Cars"],
    endpoints: (builder) => ({
        createCar: builder.mutation<TCar, Partial<TCar>>({
            query: (newCar) => ({
                url: "/car/register",
                method: "POST",
                body: newCar,
            }),
            invalidatesTags: ["Cars"],
        }),

        getCars: builder.query<{ data: TCar[] }, void>({
            query: () => "/cars",
            providesTags: ["Cars"],
        }),

        getCarById: builder.query<{ data: TCar }, number>({
            query: (id) => `/car/${id}`,
            providesTags: ["Cars"],
        }),

        getCarWithBookings: builder.query<any, number>({ // Replace `any` with proper type later
            query: (id) => `/car-bookings/${id}`,
            providesTags: ["Cars"],
        }),

        updateCar: builder.mutation<TCar, Partial<TCar> & { carID: number }>({
            query: ({ carID, ...rest }) => ({
                url: `/car/${carID}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Cars"],
        }),

        deleteCar: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/car/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cars"],
        }),
    }),
});
