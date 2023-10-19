import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, res){

    try{

        let skills = await prisma.skills.findMany({
            select:{
                id: true,
                name : true
            }
        });
    
        return NextResponse.json(skills, { status: 200 });

    }catch(err){
        return NextResponse.json({ error: err});
    }
}

export async function POST(req, res){
    const reqData = await req.json();

    let name = reqData.name

    await prisma.skills.create({
        data: {
            name: name
        }
    });

    return NextResponse.json({"status": 'success'}, { status: 200 });
}


export async function PUT(req, res){
    const reqData = await req.json();

    let id = reqData.id;
    let name = reqData.name;

    const skill = await prisma.skills.update({
        where: {
            id: id
        },
        data:{
            name: name
        }
    });

    return NextResponse.json(skill, { status: 200});
}

export async function DELETE(req, res){
    const reqData = await req.json();
    let id = reqData.id;

    let skill = await prisma.skills.delete({
        where: {
            id: id
        }
    });

    return NextResponse.json(skill, { status: 200 });

}