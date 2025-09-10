import numpy as np
import time

print('='*50)
print('LESSON 4: NUMPY VECTORIZATION POWER')
print('='*50)

# Create test data
test_size = 50000
numpy_array = np.arange(test_size)
python_list = list(range(test_size))

print(f'Testing with {test_size:,} numbers...\n')

# Basic vectorization
print('🚀 BASIC VECTORIZATION:')
start_time = time.time()
numpy_result = numpy_array * 2
numpy_time = time.time() - start_time
print(f'NumPy: array * 2 = {numpy_time:.6f}s')
print(f'Result: {numpy_result[:5]}...\n')

# Show conversion overhead
print('⚠️  WITH CONVERSION OVERHEAD:')
start_time = time.time()
converted_result = np.array(python_list) * 2
conversion_time = time.time() - start_time
print(f'Convert + multiply: {conversion_time:.6f}s')
print(f'Overhead factor: {conversion_time/numpy_time:.1f}x\n')

print('💡 VECTORIZATION EXAMPLES:\n')

# Multiple operations
arr = np.array([1, 2, 3, 4, 5])
print(f'Original array: {arr}')
print(f'Multiply by 2: {arr * 2}')
print(f'Add 10: {arr + 10}')
print(f'Square: {arr ** 2}')
print(f'Square root: {np.sqrt(arr)}')

# Broadcasting examples
print(f'\n📡 BROADCASTING MAGIC:')
matrix = np.array([[1, 2, 3], 
                   [4, 5, 6]])
print(f'Matrix:\n{matrix}')
print(f'Matrix * 2:\n{matrix * 2}')
print(f'Matrix + [10, 20, 30]:\n{matrix + [10, 20, 30]}')

# Element-wise vs matrix operations
print(f'\n🔢 ELEMENT-WISE OPERATIONS:')
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(f'a = {a}')
print(f'b = {b}')
print(f'Element-wise multiply: a * b = {a * b}')
print(f'Dot product: a @ b = {a @ b}')

# Complex operations in one line
print(f'\n🎯 COMPLEX OPERATIONS:')
data = np.arange(10)
print(f'Data: {data}')
result = (data * 2 + 5) ** 2
print(f'(data * 2 + 5) ** 2 = {result}')

# Boolean indexing
print(f'\n🔍 BOOLEAN INDEXING:')
numbers = np.array([1, 5, 3, 8, 2, 9, 4])
print(f'Numbers: {numbers}')
print(f'Numbers > 4: {numbers[numbers > 4]}')
print(f'Even numbers: {numbers[numbers % 2 == 0]}')

print(f'\n⚡ PERFORMANCE COMPARISON:')
print(f'NumPy vectorization: {numpy_time:.6f}s')
print(f'Best Python method (from lesson 3): ~0.001069s')
print(f'NumPy speedup: {0.001069/numpy_time:.1f}x faster!')

print(f"""
🎉 NUMPY ADVANTAGES:
✅ No explicit loops needed
✅ Operations applied to entire arrays
✅ Broadcasting handles different shapes
✅ Mathematical functions built-in
✅ Memory efficient
✅ C-speed performance

Next: lesson5_performance_comparison.py - Complete analysis!
""")