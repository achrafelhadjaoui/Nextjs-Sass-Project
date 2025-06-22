import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

const YT_REGEX = new RegExp("^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$")

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function Post(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url)
        if(!isYt) {
            return NextResponse.json({
                message: "Wrong Url format"
            }, {
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1]


        await prismaClient.stream.create({
           data: {
                url: data.url,
                userId: data.creatorId,
                extractedId,
                type: "Youtube"
           }
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 401
        })
    }

}

export async function GET(req:NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId")
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({
        streams,
    })
}