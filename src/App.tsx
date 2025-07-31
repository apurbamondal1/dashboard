import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import type { OverlayPanel as OverlayPanelType } from 'primereact/overlaypanel';

import { InputNumber } from 'primereact/inputnumber';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

export default function CheckboxRowSelectionDemo() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
 const [selectCount, setSelectCount] = useState<number | null>(null);

    const op = useRef<OverlayPanelType>(null);
    const page = first / rows;

    const fetchData = async (page: number) => {
        setLoading(true);
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page + 1}`);
        const data = await response.json();

        const transformed = data.data.map((item: any) => ({
            id: item.id,
            code: item.id,
            name: item.title,
            category: item.artwork_type_title,
            quantity: item.date_display,
        }));

        setProducts(transformed);
        setTotalRecords(data.pagination.total || 100);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(page);
    }, [first]);

    const onPageChange = (e: any) => {
        setFirst(e.first);
        setRows(e.rows);
    };

    const handleSelectRows = () => {
        if (!selectCount || selectCount < 1) return;

        const count = Math.min(selectCount, products.length);
        const selected = products.slice(0, count);

        setSelectedProducts(selected);
        op.current?.hide();
    };

    return (
        <div className="card p-4">
            <div className="flex justify-content-end mb-3">
                <Button
                    type="button"
                    icon="pi pi-cog"
                    label="Select Rows"
                    onClick={(e) => op.current?.toggle(e)}
                    className="p-button-outlined"
                />
                <OverlayPanel ref={op}>
                    <div className="p-3">
                        <div className="mb-2">Select rows...</div>
                        <InputNumber
                            value={selectCount}
                            onValueChange={(e) => setSelectCount(e.value)}
                            min={1}
                            max={products.length}
                            placeholder="Enter number"
                            showButtons
                            style={{ width: '100%' }}
                        />
                        <Button
                            label="Submit"
                            icon="pi pi-check"
                            className="mt-2 w-full"
                            onClick={handleSelectRows}
                        />
                    </div>
                </OverlayPanel>
            </div>

            <DataTable
                value={products}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
                paginator
                lazy
                rows={rows}
                first={first}
                totalRecords={totalRecords}
                onPage={onPageChange}
                loading={loading}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="code" header="Code" />
                <Column field="name" header="Name" />
                <Column field="category" header="Category" />
                <Column field="quantity" header="Quantity" />
            </DataTable>
        </div>
    );
}
