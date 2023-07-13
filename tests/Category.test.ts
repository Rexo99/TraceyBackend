import axios from 'axios';

const BASE_URL = 'http://localhost:6060/api';  // Update with your API base URL

describe('Category API', () => {
    let userId: number;
    let categoryId: number;
    let expenditureId: number;
    let token: string;

    beforeAll(async () => {
        // Perform any setup operations, such as creating a test user
        const userResponse = await axios.post(`${BASE_URL}/register`, {
            name: 'TestUser',
            password: 'test123',
        });

        userId = 1;

        // Login to obtain JWT token
        const loginResponse = await axios.post(`${BASE_URL}/login`, {
            name: 'TestUser',
            password: 'test123',
        });

        token = loginResponse.data;
    });

    afterAll(async () => {
        // Perform any cleanup operations, such as deleting the test user
    });

    test('should create a new category', async () => {
        const response = await axios.post(`${BASE_URL}/users/${userId}/categories`, {
            name: 'Test Category',
            budget: 1000,
            icon: 'category-icon',
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.message.name).toBe('Test Category');
        expect(response.data.message.budget).toBe(1000);

        // store the created category ID for further tests
        categoryId = response.data.message.id;
    });

    test('should get a category', async () => {
        const response = await axios.get(`${BASE_URL}/users/${userId}/categories/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.message.name).toBe('Test Category');
        expect(response.data.message.budget).toBe(1000);
    });

    test('should update a category', async () => {
        const response = await axios.put(`${BASE_URL}/users/${userId}/categories/${categoryId}`, {
            name: 'Updated Category',
            budget: 1500,
            icon: 'updated-icon',
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.message.name).toBe('Updated Category');
        expect(response.data.message.budget).toBe(1500);
    });

    test('should get all categories by user', async () => {
        const response = await axios.get(`${BASE_URL}/users/${userId}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data.message)).toBe(true);
        expect(response.data.message.length).toBeGreaterThan(0);
    });

    test('should create a new expenditure', async () => {
        const response = await axios.post(`${BASE_URL}/users/${userId}/expenditures`, {
            name: 'Test Expenditure',
            amount: 50.0,
            dateTime: '2022-01-01T00:00:00Z',
            categoryId: categoryId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.message.name).toBe('Test Expenditure');
        expect(response.data.message.amount).toBe(50.0);

        // store the created expenditure ID for further tests
        expenditureId = response.data.message.id;
    });

    test('should get an expenditure', async () => {
        const response = await axios.get(`${BASE_URL}/users/${userId}/expenditures/${expenditureId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.message.name).toBe('Test Expenditure');
        expect(response.data.message.amount).toBe(50.0);
    });

    test('should update an expenditure', async () => {
        const response = await axios.put(`${BASE_URL}/users/${userId}/expenditures/${expenditureId}`, {
            name: 'Updated Expenditure',
            amount: 75.0,
            dateTime: '2022-02-01T00:00:00Z',
            categoryId: categoryId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.message.name).toBe('Updated Expenditure');
        expect(response.data.message.amount).toBe(75.0);
    });

    test('should get all expenditures by user', async () => {
        const response = await axios.get(`${BASE_URL}/users/${userId}/expenditures`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data.message)).toBe(true);
        expect(response.data.message.length).toBeGreaterThan(0);
    });

    test('should delete an expenditure', async () => {
        const response = await axios.delete(`${BASE_URL}/users/${userId}/expenditures/${expenditureId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.message).toBe('Expenditure deleted successfully');
    });

    test('should not get a deleted expenditure', async () => {
        try {
            await axios.get(`${BASE_URL}/users/${userId}/expenditures/${expenditureId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error: any) {
            expect(error.response.status).toBe(404);
        }
    });

    test('should delete a category', async () => {
        const response = await axios.delete(`${BASE_URL}/users/${userId}/categories/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status).toBe(200);
        expect(response.data.message).toBe('Category deleted successfully');
    });

    test('should not get a deleted category', async () => {
        try {
            await axios.get(`${BASE_URL}/users/${userId}/categories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error: any) {
            expect(error.response.status).toBe(404);
        }
    });

});