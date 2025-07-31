import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
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
    const [selectCount, setSelectCount] = useState(null);

    const op = useRef(null);
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
        op.current.hide();
    };

    return (
        <div className="card p-4">
            <div className="flex justify-content-end mb-3">
                <Button
                    type="button"
                    icon="pi pi-cog"
                    label="Select Rows"
                    onClick={(e) => op.current.toggle(e)}
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






// import { useState, useEffect, useRef } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { OverlayPanel } from 'primereact/overlaypanel';
// import { InputNumber } from 'primereact/inputnumber';

// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

// export default function CheckboxRowSelectionDemo() {
//     const [products, setProducts] = useState([]);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(12);
//     const [loading, setLoading] = useState(false);
//     const [totalRecords, setTotalRecords] = useState(0);
//     const [selectCount, setSelectCount] = useState(null);

//     const op = useRef(null);
//     const page = first / rows;

//     const fetchData = async (page: number) => {
//         setLoading(true);
//         const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page + 1}`);
//         const data = await response.json();

//         const transformed = data.data.map((item: any) => ({
//             id: item.id,
//             code: item.id,
//             name: item.title,
//             category: item.artwork_type_title,
//             quantity: item.date_display,
//         }));

//         setProducts(transformed);
//         setTotalRecords(data.pagination.total || 100);
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchData(page);
//     }, [first]);

//     const onPageChange = (e: any) => {
//         setFirst(e.first);
//         setRows(e.rows);
//     };

// const handleSelectRows = () => {
//     if (!selectCount || selectCount < 1) return;

//     const count = Math.min(selectCount, products.length);
//     const selected = [];

//     for (let i = 0; i < count; i++) {
//         selected.push(products[i]);
//     }

//     console.log("Selecting rows:", selected); // debug

//     setSelectedProducts(selected);
//     op.current.hide();
// };



//     const overlayColumnBody = () => {
//         return (
//             <>
//                 <Button
//                     type="button"
//                     icon="pi pi-cog"
//                     className="p-button-text"
//                     onClick={(e) => op.current.toggle(e)}
//                 />
//                 <OverlayPanel ref={op}>
//                     <div className="p-3">
//                         <div className="mb-2">Select number of rows:</div>
//                         <InputNumber
//                             value={selectCount}
//                             onValueChange={(e) => setSelectCount(e.value)}
//                             min={1}
//                             max={products.length}
//                             showButtons
//                         />
//                         <Button
//                             label="Select"
//                             icon="pi pi-check"
//                             className="mt-2"
//                             onClick={handleSelectRows}
//                         />
//                     </div>
//                 </OverlayPanel>
//             </>
//         );
//     };

//     return (
//         <div className="card">
//             <DataTable
//                 value={products}
//                 selection={selectedProducts}
//                 onSelectionChange={(e) => setSelectedProducts(e.value)}
//                 dataKey="id"
//                 tableStyle={{ minWidth: '50rem' }}
//                 paginator
//                 lazy
//                 rows={rows}
//                 first={first}
//                 totalRecords={totalRecords}
//                 onPage={onPageChange}
//                 loading={loading}
//             >
//                 <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
//                 <Column field="code" body={overlayColumnBody}  style={{ width: '10rem' }} header="Code" />
//                 <Column field="name" header="Name" />
//                 <Column field="category" header="Category" />
//                 <Column field="quantity" header="Quantity" />
//             </DataTable>
//         </div>
//     );
// }


// import { useState, useEffect,useRef } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
// import { OverlayPanel } from 'primereact/overlaypanel';
// import { Button } from 'primereact/button';
// import { InputNumber } from 'primereact/inputnumber';

// export default function CheckboxRowSelectionDemo() {
//     const [products, setProducts] = useState([]);
//     const [selectedProducts, setSelectedProducts] = useState(null);
//     const [first, setFirst] = useState(0);
//     const [rows, setRows] = useState(12);
//     const [loading, setLoading] = useState(false);
//     const [totalRecords, setTotalRecords] = useState(0);
//      const [selectCount, setSelectCount] = useState(null);

//       const op = useRef(null);
//       const page = first / rows;

  
//   const fetchData = async (page: number) => {
//     setLoading(true);
//     const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page + 1}`);
//     const data = await response.json();

//   const transformed = data.data.map((item: any) => ({
//   id: item.id,
//   code: item.id,
//   name: item.title,
//   category: item.artwork_type_title,
//   quantity: item.date_display,
// }));


//     setProducts(transformed);
//     setTotalRecords(data.pagination.total || 100);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData(page);
//   }, [first]);

//   const onPageChange = (e: any) => {
//     setFirst(e.first);
//     setRows(e.rows);
//   };

// const handleSelectRows = () => {
//         if (!selectCount || selectCount < 1) return;

//         const selected = products.slice(0, selectCount);
//         setSelectedProducts(selected);
//         op.current.hide();
//     };

//     const overlayColumnBody = () => {
//         return (
//             <>
//                 <Button
//                     type="button"
//                     icon="pi pi-cog"
//                     className="p-button-text"
//                     onClick={(e) => op.current.toggle(e)}
//                 />
//                 <OverlayPanel ref={op}>
//                     <div className="p-3">
//                         <div className="mb-2">Select number of rows:</div>
//                         <InputNumber
//                             value={selectCount}
//                             onValueChange={(e) => setSelectCount(e.value)}
//                             min={1}
//                             max={products.length}
//                             showButtons
//                         />
//                         <Button
//                             label="Select"
//                             icon="pi pi-check"
//                             className="mt-2"
//                             onClick={handleSelectRows}
//                         />
//                     </div>
//                 </OverlayPanel>
//             </>
//         );
//     };





//     return (
//         <div className="card">
//             <DataTable
//                 value={products}
//                 selection={selectedProducts}
//                 onSelectionChange={(e) => setSelectedProducts(e.value)}
//                 dataKey="id"
//                 tableStyle={{ minWidth: '50rem' }}
//                 paginator
//                 lazy
//                 rows={rows}
//                 first={first}
//                 totalRecords={totalRecords}
//                 onPage={onPageChange}
//                 loading={loading}


//             >
//                 <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
//                 <Column  field="code" header="Code"  ></Column>
//                  <Column body={overlayColumnBody} header="Select Rows" style={{ width: '10rem' }} />
//                 <Column field="name" header="Name"></Column>
//                 <Column field="category" header="Category"></Column>
//                 <Column field="quantity" header="Quantity"></Column>
//             </DataTable>
//         </div>
//     );
// }




        
            








// import  { useEffect, useState } from 'react';
// import './App.css';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Checkbox } from 'primereact/checkbox';
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

// interface Artwork {
//   id: number;
//   title: string;
//   artwork_type_title: string;
//   date_display: string;
// }

// function App() {
//   const [artworks, setArtworks] = useState<Artwork[]>([]);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [first, setFirst] = useState(0);
//   const [rows, setRows] = useState(12);
//   const [selectedRows, setSelectedRows] = useState<{ [key: number]: Artwork }>({});

//   const page = first / rows;

//   const fetchData = async (page: number) => {
//     setLoading(true);
//     const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page + 1}`);
//     const data = await response.json();

//     const transformed = data.data.map((item: any) => ({
//       id: item.id,
//       title: item.title,
//       artwork_type_title: item.artwork_type_title,
//       date_display: item.date_display,
//     }));

//     setArtworks(transformed);
//     setTotalRecords(data.pagination.total || 100);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData(page);
//   }, [first]);

//   const onPageChange = (e: any) => {
//     setFirst(e.first);
//     setRows(e.rows);
//   };

//   const onRowSelect = (row: Artwork, checked: boolean) => {
//     const updated = { ...selectedRows };
//     if (checked) {
//       updated[row.id] = row;
//     } else {
//       delete updated[row.id];
//     }
//     setSelectedRows(updated);
//   };

//   const isRowSelected = (id: number) => !!selectedRows[id];

//   const onSelectAllToggle = (checked: boolean) => {
//     const updated = { ...selectedRows };
//     if (checked) {
//       artworks.forEach((row) => {
//         updated[row.id] = row;
//       });
//     } else {
//       artworks.forEach((row) => {
//         delete updated[row.id];
//       });
//     }
//     setSelectedRows(updated);
//   };

//   const headerCheckbox = (
//     <Checkbox
//       checked={artworks.length > 0 && artworks.every((row) => isRowSelected(row.id))}
//       onChange={(e) => onSelectAllToggle(e.checked!)}
//     />
//   );

//   const rowSelectionColumn = (rowData: Artwork) => (
//     <Checkbox
//       checked={isRowSelected(rowData.id)}
//       onChange={(e) => onRowSelect(rowData, e.checked!)}
//     />
//   );

//   return (
//     <div className="card p-4">
//       <h2>Artworks Table</h2>

//       {/* Custom Selection Panel */}
//       <div className="mb-3 p-2 bg-primary text-white border-round">
//         Selected Rows: {Object.keys(selectedRows).length}
//       </div>

//       <DataTable
//         value={artworks}
//         paginator
//         lazy
//         rows={rows}
//         first={first}
//         totalRecords={totalRecords}
//         onPage={onPageChange}
//         loading={loading}
//         dataKey="id"
//         tableStyle={{ minWidth: '60rem' }}
//       >
//         <Column header={headerCheckbox} body={rowSelectionColumn} style={{ width: '3rem' }} />
//         <Column field="id" header="ID" />
//         <Column field="title" header="Title" />
//         <Column field="artwork_type_title" header="Type" />
//         <Column field="date_display" header="Date" />
//       </DataTable>
//     </div>
//   );
// }

// export default App;

           




// import { useEffect, useState } from 'react';
// import './App.css';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Checkbox } from 'primereact/checkbox';
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

// interface Artwork {
//   id: number;
//   title: string;
//   artwork_type_title: string;
//   date_display: string;
// }

// function App() {
//   const [artworks, setArtworks] = useState<Artwork[]>([]);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [first, setFirst] = useState(0);
//   const [rows, setRows] = useState(12);
//   const [selectedRows, setSelectedRows] = useState<{ [key: number]: Artwork }>({});

//   const page = first / rows;

//   const fetchData = async (page: number) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page + 1}`);
//       const data = await response.json();

//       const transformed = data.data.map((item: any) => ({
//         id: item.id,
//         title: item.title,
//         artwork_type_title: item.artwork_type_title,
//         date_display: item.date_display,
//       }));

//       setArtworks(transformed);
//       setTotalRecords(data.pagination.total || 100);
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(page);
//   }, [first]);

//   const onPageChange = (e: any) => {
//     setFirst(e.first);
//     setRows(e.rows);
//   };

//   const onRowSelect = (row: Artwork, checked: boolean) => {
//     const updated = { ...selectedRows };
//     if (checked) {
//       updated[row.id] = row;
//     } else {
//       delete updated[row.id];
//     }
//     setSelectedRows(updated);
//   };

//   const isRowSelected = (id: number) => !!selectedRows[id];

//   const onSelectAllToggle = (checked: boolean) => {
//     const updated = { ...selectedRows };
//     if (checked) {
//       artworks.forEach((row) => {
//         updated[row.id] = row;
//       });
//     } else {
//       artworks.forEach((row) => {
//         delete updated[row.id];
//       });
//     }
//     setSelectedRows(updated);
//   };

//   const headerCheckbox = (
//     <Checkbox
//       checked={
//         artworks.length > 0 && artworks.every((row) => isRowSelected(row.id))
//       }
//       indeterminate={
//         artworks.some((row) => isRowSelected(row.id)) &&
//         !artworks.every((row) => isRowSelected(row.id))
//       }
//       onChange={(e) => onSelectAllToggle(e.checked!)}
//     />
//   );

//   const rowSelectionColumn = (rowData: Artwork) => (
//     <Checkbox
//       inputId={`checkbox_${rowData.id}`}
//       checked={isRowSelected(rowData.id)}
//       onChange={(e) => onRowSelect(rowData, e.checked!)}
//     />
//   );

//   return (
//     <div className="card p-4">
//       <h2 className="mb-3">Artworks Table</h2>

//       {/* Selection panel */}
//       <div className="mb-3 p-2 bg-primary text-white border-round">
//         Selected Rows: {Object.keys(selectedRows).length}
//       </div>

//       <DataTable
//         value={artworks}
//         paginator
//         lazy
//         rows={rows}
//         first={first}
//         totalRecords={totalRecords}
//         onPage={onPageChange}
//         loading={loading}
//         dataKey="id"
//         tableStyle={{ minWidth: '60rem' }}
//       >
//         <Column header={headerCheckbox} body={rowSelectionColumn} style={{ width: '3rem' }} />
//         <Column field="id" header="ID" />
//         <Column field="title" header="Title" />
//         <Column field="artwork_type_title" header="Type" />
//         <Column field="date_display" header="Date" />
//       </DataTable>
//     </div>
//   );
// }

// export default App;
