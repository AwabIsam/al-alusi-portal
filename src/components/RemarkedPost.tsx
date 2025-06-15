"use client";

import React, { useEffect, useState } from "react";
import { UploadSimple, User, X } from "@phosphor-icons/react";
import Button from "@/components/Button";
import { Tables } from "@/types/supabase/public.types";
import Image from "next/image";
import { apiFetch } from "@/utils/functions/fetch";
import Textarea from "./ui/textarea";
import Input from "./ui/input";
import { Dialog } from "@headlessui/react";


export default function RemarkedPost({
	post,
	close,
	setPost,
}: {
	post: Tables<"class_posts">;
	close: () => void;
	setPost: (x: Tables<"class_posts">) => void;
}) {
	const [title, setTitle] = useState<string>(post.title);
	const [description, setDescription] = useState<string>(post.content);
	const [images, setImages] = useState<FileList | null>();
	const [remarkText, setRemarkText] = useState<string>("");

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	const bucket = post.bucket_id;
	const imagePaths = post.images_path ?? [];
	const previewImages = imagePaths.slice(0, 3);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleImageClick = (index: number) => {
		setSelectedIndex(index);
		setIsOpen(true);
	};

	useEffect(() => {
		async function getRemarkData() {
			try {
				const remark = await apiFetch(`/api/newsfeed/class/get-remark?id=${post.id}`, {
					method: "GET",
				});

				setRemarkText(remark);
			} catch (error) {
				console.error(error);
			}
		}

		getRemarkData();
	}, []);

	async function updatePost() {
		try {
			const p = await apiFetch(`/api/newsfeed/class/post/update?id=${post.id}`, {
				method: "PATCH",
				body: JSON.stringify({
					title,
					content: description,
				}),
			});

			console.log(p);

			setPost(p);

			close();
		} catch (error) {
			console.error(error);
		}
	}

	async function deletePost() {
	try {
		await apiFetch(`/api/newsfeed/class/post/delete/`, {
			method: "POST",
			body: JSON.stringify({id: post.id}),
		});
		close(); // closes the modal after deletion
	} catch (error) {
		console.error("Failed to delete post:", error);
	}
}


	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImages(e.target.files);
	};

	return (
		<>
		<div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
			<div className="relative bg-white w-full max-w-3xl rounded-xl p-2 space-y-2">
				<button type="button" onClick={close} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>

				<div className="flex flex-row border border-gray-200 rounded-md p-4 space-y-6">
					<div className="flex flex-col gap-4 p-3 w-full">
						<div className="flex flex-row items-center gap-2 w-full">
							<User size={32} />
							<div>
								<h6 className="font-semibold w-44 overflow-hidden text-ellipsis whitespace-nowrap">Mr. Fairouz</h6>
								<div className="flex flex-row items-center gap-2">
									<h6 className="text-[12px] text-[#909090]">
										{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(post.created_at))}
									</h6>
									<h6 className="text-[12px] text-[#909090]">
										{new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })
											.format(new Date(post.created_at))
											.toLocaleLowerCase()}
									</h6>
								</div>
							</div>
						</div>

						<div className="">
							<label className="block text-sm font font-medium text-black mb-1">Title</label>
							<Input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter title"
								className="w-full px-3 py-2 rounded-md"
							/>
						</div>

						<div className="">
							<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
							<Textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Enter description"
								rows={4}
								className="w-full px-3 py-2 border rounded-md resize-none"
							/>
						</div>

						{/* Image Preview */}
						{imagePaths.length > 0 && (
							<div className="w-full">
								<label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
								<div className="grid grid-cols-3 gap-2 w-full rounded-xl overflow-hidden h-60 relative">
									{previewImages.map((path, index) => (
										<div
											key={path}
											className={`relative w-full h-full ${index === 2 && imagePaths.length > 3 ? "brightness-85" : ""} cursor-pointer`}
											onClick={() => handleImageClick(index)}
										>
											<Image
												src={`${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`}
												alt={`Post image ${index + 1}`}
												fill
												className="object-cover"
											/>
											{index === 2 && imagePaths.length > 3 && (
												<div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-lg font-bold">
													+{imagePaths.length - 3} more
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					<Textarea placeholder="Type your remark here..." value={remarkText} className="w-44 text-black resize-none" disabled />
				</div>

				{/* Action Buttons */}
				<div className="flex justify-end gap-2">
					<Button text="Delete Post" color="danger" onClick={deletePost} className="block ml-auto font-semibold text-sm" />
					<Button text="Update Post" color="dark-blue" onClick={updatePost} className="font-semibold text-sm" />
				</div>
			</div>
		</div>

		{/* Fullscreen Image Viewer */}
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
					<div className="bg-white p-4 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-auto">
						<div className="flex justify-end">
							<button
								onClick={() => setIsOpen(false)}
								className="text-sm text-red-500 hover:font-bold font-medium px-2 py-1"
							>
								Close ✕
							</button>
						</div>
						{/* main image */}
						<Image
							src={`${supabaseUrl}/storage/v1/object/public/${bucket}/${imagePaths[selectedIndex]}`}
							alt={`Selected image`}
							width={800}
							height={600}
							className="object-contain w-full"
						/>
						{/* dots to switch image display */}
						<div className="flex justify-center gap-2 mt-4">
							{imagePaths.map((_, i) => (
								<button
									key={i}
									className={`w-3 h-3 rounded-full ${i === selectedIndex ? "bg-black" : "bg-gray-400"}`}
									onClick={() => setSelectedIndex(i)}
								/>
							))}
						</div>
					</div>
				</div>
			</Dialog>
	</>
		
	);
}
