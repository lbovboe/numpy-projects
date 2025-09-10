# NumPy Basic Lessons

A structured series of Python lessons comparing NumPy with pure Python approaches.

## Lesson Structure

### 📚 Lesson 1: Introduction (`lesson1_intro.py`)
- NumPy basics and benefits
- Basic array creation and properties
- Why NumPy matters for scientific computing

### ⏱️ Lesson 2: Creation Comparison (`lesson2_creation_comparison.py`)
- Compare creation time of 50,000 numbers
- Python list vs NumPy array creation
- Performance ranking and insights

### 🐍 Lesson 3: Python Methods (`lesson3_python_methods.py`)
- List comprehension, map, for loops, in-place updates
- When to use each Python method
- Common mistakes and best practices

### ⚡ Lesson 4: NumPy Vectorization (`lesson4_numpy_vectorization.py`)
- Vectorization examples and broadcasting
- Element-wise operations
- Boolean indexing and complex operations

### 🏆 Lesson 5: Performance Analysis (`lesson5_performance_comparison.py`)
- Complete comparison of all methods
- Decision guide for choosing approaches
- Performance results summary

## How to Run

```bash
# Run individual lessons
python3 lesson1_intro.py
python3 lesson2_creation_comparison.py
python3 lesson3_python_methods.py
python3 lesson4_numpy_vectorization.py
python3 lesson5_performance_comparison.py

# Or run all at once
for i in {1..5}; do echo "=== LESSON $i ==="; python3 lesson${i}_*.py; echo; done
```

## Key Takeaways

- **NumPy is 7x faster** for array creation
- **NumPy vectorization beats Python** for large numerical data
- **List comprehension** remains competitive for small datasets
- **Choose based on dataset size and operation type**

## Files Generated
- `performance_results.txt` - Detailed timing results from lesson 5

## Prerequisites
- Python 3.x
- NumPy (`pip install numpy`)