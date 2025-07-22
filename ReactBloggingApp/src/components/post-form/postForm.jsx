import React from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select , RTE} from '../index'
import AppwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = await data.image[0] ? AppwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                await AppwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await AppwriteService.UpdatePost({
            postId: post.$id, // ✅ make sure post ID is passed
            title: data.title,
            slug: data.slug,
            content: data.content,
            featuredImage: file ? file.$id : post.featuredImage, // fallback to existing image
            status: data.status,
        });
        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    }
        else {
            const file = await AppwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await AppwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const SlugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
        }
        else{
            return '';
        }
    })

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", SlugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, SlugTransform, setValue]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-6 w-full">
  {/* Left Section - Main Content */}
  <div className="md:w-2/3 w-full space-y-4">
    <Input
      label="Title :"
      placeholder="Title"
      className=""
      {...register("title", { required: true })}
    />

    <Input
      label="Slug :"
      placeholder="Slug"
      {...register("slug", { required: true })}
      onInput={(e) => {
        setValue("slug", SlugTransform(e.currentTarget.value), {
          shouldValidate: true,
        })
      }}
    />

    <RTE
      label="Content :"
      name="content"
      control={control}
      defaultValue={getValues("content")}
    />
  </div>

  {/* Right Section - Image & Meta */}
  <div className="md:w-1/3 w-full space-y-4">
    <Input
      label="Featured Image :"
      type="file"
      accept="image/png, image/jpg, image/jpeg, image/gif"
      {...register("image", { required: !post })}
    />

    {post && (
      <div className="w-full">
        <img
          src={AppwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-lg w-full object-cover max-h-60 border border-gray-300 dark:border-gray-600 shadow-sm"
        />
      </div>
    )}

    <Select
      options={["active", "inactive"]}
      label="Status"
      {...register("status", { required: true })}
    />

    <Button
      type="submit"
      bgColor={post ? "bg-green-500 hover:bg-green-600" : undefined}
      className="w-full"
    >
      {post ? "Update" : "Submit"}
    </Button>
  </div>
</form>

  )
}