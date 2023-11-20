
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/userSlice";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useGetBlogsQuery } from "../api/apiSlice";

const UserPage = () => {
    const { userId } = useParams()

    const user = useSelector(state => selectUserById(state, userId))

    const selectUserBlogs = useMemo(() => {
        const emptyArray = []

        return createSelector(
            (res) => res.data,
            (res, userId) => userId,
            (data, userId) =>
                data?.filter((blog) => blog.user === userId) ?? emptyArray
        )
    }, [])

    const { userBlogs } = useGetBlogsQuery(undefined, {
        selectFromResult: result => ({
            ...result,
            userBlogs: selectUserBlogs(result, userId)
        })
    })

    const blogTitles = userBlogs.map((blog) => (
        <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.fullname}</h2>
            <ul>{
                userBlogs.length > 0 ? (
                    blogTitles
                ) : (
                    <li
                        style={{ listStyleType: "none" }}
                    >
                        نویسنده ما هیچ پستی تا به الان منتشر نکرده
                    </li>
                )}</ul>
        </section>
    )
}

export default UserPage