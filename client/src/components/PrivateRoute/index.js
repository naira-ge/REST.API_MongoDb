import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loginSuccess } from "../../features/login/loginSlice";

import { fetchNewAccessJWT } from "../../api/userApi";
import DefaultLayout from "../DefaultLayout/index";

export const PrivateRoute = ({ children, ...rest }) => {
	const dispatch = useDispatch();
	const { isAuth } = useSelector(state => state.login);
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		const updateAccessJWT = async () => {
			const result = await fetchNewAccessJWT();
			result && dispatch(loginSuccess());
		};

		!sessionStorage.getItem("accessJWT") &&
			localStorage.getItem("crmSite") &&
			updateAccessJWT();

		!isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
	}, [dispatch, isAuth, user._id]);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					<DefaultLayout>{children}</DefaultLayout>
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
