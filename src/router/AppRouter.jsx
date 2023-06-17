import React from 'react';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import { EnterpriseForm } from '../components/EnterpriseForm';
import { ProductForm } from '../components/ProductForm';
import { EnterprisePage, InventoryPage, LoginPage, ProductPage, MainPage } from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <PrivateRoute>
                    <MainPage />
                </PrivateRoute>   
            )
        },
        {
            path: "/login",
            element: (
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>   
            )
        },
        {
            path: "/enterprise",
            element: (
                <PrivateRoute>
                    <EnterprisePage />
                </PrivateRoute>
            )
        },
        {
            path: "/enterprise/create",
            element: (
                <PrivateRoute>
                    <EnterpriseForm />
                </PrivateRoute>
            )
        },
        {
            path: "/enterprise/:id",
            element: (
                <PrivateRoute>
                    <EnterpriseForm />
                </PrivateRoute>
            )
        },
        {
            path: "/product",
            element: (
                <PrivateRoute>
                    <ProductPage />
                </PrivateRoute>
            )
        },
        {
            path: "/product/create",
            element: (
                <PrivateRoute>
                    <ProductForm />
                </PrivateRoute>
            )
        },
        {
            path: "/product/:id",
            element: (
                <PrivateRoute>
                    <ProductForm />
                </PrivateRoute>
            )
        },
        {
            path: "/inventory",
            element: (
                <PrivateRoute>
                    <InventoryPage />
                </PrivateRoute>
            )
        },
    ])

  return (<RouterProvider router={router} />)
}
