import prisma from "../configurations/database.js";
import response from "../response.js";
import { paginate } from "../utilities/paginate.js";

export const getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await prisma.role.findUnique({
            where: { id: parseInt(id) }
        });

        if (role) {
            res.json(response(res, 200, role, "Role fetched successfully"));
        } else {
            res.status(404).json({ error: `Role with ID: ${parseInt(id)} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch role" });
    }
}

export const getAllRoles = async (req, res) => {
    try {
        const roles = await prisma.role.findMany({
            where: { isDeleted: false }
        });
        res.json(response(res, 200, roles, "Roles fetched successfully"));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch roles" });
    }
};

export const getRoles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        
        const result = await paginate(prisma.role, {
            search,
            page,
            limit,
        });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch roles" });
    }
}

export const createRole = async (req, res) => {
    const { name } = req.body;
    try {
        const newRole = await prisma.role.create({
        data: { name }
        });
        res.status(201).json(response(res, 201, newRole, "Role created successfully"));
    } catch (error) {
        res.status(500).json({ error: "Failed to create role" });
    }
}

export const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedRole = await prisma.role.update({
        where: { id: parseInt(id) },
        data: { name }
        });
        res.json(response(res, 200, updatedRole, "Role updated successfully"));
    } catch (error) {
        res.status(500).json({ error: "Failed to update role" });
    }
}

export const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.role.delete({
        where: { id: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete role" });
    }
}