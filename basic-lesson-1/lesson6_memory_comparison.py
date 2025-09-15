import numpy as np
import sys
import psutil
import os

print('='*50)
print('LESSON 6: MEMORY COMPARISON - Python Lists vs NumPy Arrays')
print('='*50)

def get_memory_usage():
    """Get current memory usage in MB"""
    process = psutil.Process(os.getpid())
    return process.memory_info().rss / 1024 / 1024

# Test different sizes of data
sizes = [1000, 10000, 100000, 1000000]

print("Memory comparison between Python lists and NumPy arrays:")
print("-" * 60)

for size in sizes:
    print(f"\nSize: {size:,} elements")

    # Memory before creating any data structures
    initial_memory = get_memory_usage()

    # Create Python list with integers
    python_list = list(range(size))
    list_memory = get_memory_usage()

    # Create NumPy array with same integers
    numpy_array = np.arange(size, dtype=np.int64)
    array_memory = get_memory_usage()

    # Calculate memory usage
    list_usage = list_memory - initial_memory
    array_usage = array_memory - list_memory

    # Calculate memory per element
    list_bytes_per_element = sys.getsizeof(python_list) / size
    array_bytes_per_element = numpy_array.nbytes / size

    print(f"  Python list memory usage: {list_usage:.2f} MB")
    print(f"  NumPy array memory usage: {array_usage:.2f} MB")
    print(f"  Memory savings with NumPy: {((list_usage - array_usage) / list_usage * 100):.1f}%")
    print(f"  Bytes per element (list): {list_bytes_per_element:.1f}")
    print(f"  Bytes per element (array): {array_bytes_per_element:.1f}")

    # Memory efficiency ratio
    efficiency_ratio = list_usage / array_usage if array_usage > 0 else 0
    print(f"  NumPy is {efficiency_ratio:.1f}x more memory efficient")

    # Clean up
    del python_list, numpy_array

print("\n" + "="*60)
print("DETAILED MEMORY ANALYSIS")
print("="*60)

# Detailed analysis with different data types
print("\nMemory usage by data type (1 million elements):")
size = 1000000

# Integer comparison
print(f"\nInteger arrays ({size:,} elements):")
python_int_list = [i for i in range(size)]  # Python integers
numpy_int32 = np.arange(size, dtype=np.int32)  # 32-bit integers
numpy_int64 = np.arange(size, dtype=np.int64)  # 64-bit integers

print(f"  Python list (int objects): {sys.getsizeof(python_int_list) / 1024 / 1024:.2f} MB")
print(f"  NumPy int32 array: {numpy_int32.nbytes / 1024 / 1024:.2f} MB")
print(f"  NumPy int64 array: {numpy_int64.nbytes / 1024 / 1024:.2f} MB")

# Float comparison
print(f"\nFloat arrays ({size:,} elements):")
python_float_list = [float(i) for i in range(size)]  # Python floats
numpy_float32 = np.arange(size, dtype=np.float32)  # 32-bit floats
numpy_float64 = np.arange(size, dtype=np.float64)  # 64-bit floats

print(f"  Python list (float objects): {sys.getsizeof(python_float_list) / 1024 / 1024:.2f} MB")
print(f"  NumPy float32 array: {numpy_float32.nbytes / 1024 / 1024:.2f} MB")
print(f"  NumPy float64 array: {numpy_float64.nbytes / 1024 / 1024:.2f} MB")

print("\n" + "="*60)
print("MEMORY LAYOUT DETAILS")
print("="*60)

# Array memory layout information
sample_array = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.int32)
print(f"\nSample 2D array memory details:")
print(f"  Array: {sample_array}")
print(f"  Shape: {sample_array.shape}")
print(f"  Data type: {sample_array.dtype}")
print(f"  Item size: {sample_array.itemsize} bytes")  # Bytes per element
print(f"  Total bytes: {sample_array.nbytes} bytes")  # Total memory used
print(f"  Strides: {sample_array.strides}")  # Memory layout
print(f"  C-contiguous: {sample_array.flags.c_contiguous}")  # Row-major order
print(f"  F-contiguous: {sample_array.flags.f_contiguous}")  # Column-major order

print("\n" + "="*60)
print("KEY TAKEAWAYS")
print("="*60)
print("""
1. NumPy arrays use significantly less memory than Python lists
2. NumPy stores data in contiguous memory blocks (more efficient)
3. Python lists store references to objects (overhead per element)
4. NumPy allows choosing specific data types to optimize memory
5. Memory efficiency improves with larger datasets
6. NumPy's memory layout enables faster operations

Memory efficiency factors:
- Python lists: ~28 bytes per integer (object overhead)
- NumPy int32: 4 bytes per integer
- NumPy int64: 8 bytes per integer
- NumPy float32: 4 bytes per float
- NumPy float64: 8 bytes per float
""")

# Clean up
del python_int_list, numpy_int32, numpy_int64
del python_float_list, numpy_float32, numpy_float64, sample_array