import express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CheckoutResponse } from '../common/types';
import { ExampleStore } from './data';

export function getBugId(req: express.Request) {
    return Number(req.query.bug_id) || Number(process.env.BUG_ID) || 0;
}

const indexHtmlContent = readFileSync(join(__dirname, '..', '..', "dist", "index.html")).toString();

const indexHtml = (req: express.Request, res: express.Response) => {
    res.send(indexHtmlContent.replace('</head>', `<script>var process={env:{BUG_ID:'${getBugId(req)}'}}</script></head>`) );
};

const store = new ExampleStore();

export const router = express.Router();

router.get('/', indexHtml);
router.get('/catalog', indexHtml);
router.get('/catalog/:id', indexHtml);
router.get('/delivery', indexHtml);
router.get('/contacts', indexHtml);
router.get('/cart', indexHtml);

router.get('/api/products', (req, res) => {
    const products = store.getAllProducts(getBugId(req));
    res.json(products);
});

router.get('/api/products/:id(\\d+)', (req, res) => {
    const bugId = getBugId(req);

    let id = Number(req.params.id);

    if(bugId === 3) {
        id = 0;
    }

    const product = store.getProductById(id);
    res.json(product);
});

router.post('/api/checkout', (req, res) => {
    const bugId = getBugId(req);

    if (bugId === 2) {
        res.json({ id: Date.now() });
    } else {
        const id = store.createOrder(req.body);
        const data: CheckoutResponse = { id };
        res.json(data);
    }
});

router.get('/api/orders', (req, res) => {
    const orders = store.getLatestOrders();
    res.json(orders);
});
